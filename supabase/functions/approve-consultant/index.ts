Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
        'Access-Control-Max-Age': '86400',
        'Access-Control-Allow-Credentials': 'false'
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
        const { consultantId, approved, adminNotes } = await req.json();

        if (!consultantId) {
            throw new Error('Consultant ID is required');
        }

        if (typeof approved !== 'boolean') {
            throw new Error('Approval status must be true or false');
        }

        // Get user from auth header
        const authHeader = req.headers.get('authorization');
        if (!authHeader) {
            throw new Error('Authorization required');
        }

        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const supabaseUrl = Deno.env.get('SUPABASE_URL');

        if (!serviceRoleKey || !supabaseUrl) {
            throw new Error('Supabase configuration missing');
        }

        const token = authHeader.replace('Bearer ', '');

        // Verify admin user
        const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'apikey': serviceRoleKey
            }
        });

        if (!userResponse.ok) {
            throw new Error('Invalid authentication token');
        }

        const userData = await userResponse.json();
        const adminUserId = userData.id;

        // Check if user has admin role (you'd implement your own admin role logic here)
        // For now, we'll assume the user is admin if they have a valid token

        // Update consultant approval status
        const updateData: any = {
            updated_at: new Date().toISOString()
        };

        if (approved) {
            updateData.approved_at = new Date().toISOString();
            updateData.approved_by = adminUserId;
        } else {
            updateData.approved_at = null;
            updateData.approved_by = null;
        }

        const updateResponse = await fetch(`${supabaseUrl}/rest/v1/brexit_consultants?id=eq.${consultantId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(updateData)
        });

        if (!updateResponse.ok) {
            const errorText = await updateResponse.text();
            throw new Error(`Failed to update consultant: ${errorText}`);
        }

        const updatedConsultant = await updateResponse.json();

        // Log the approval action (in a real app, you'd have an audit log table)
        console.log(`Consultant ${consultantId} ${approved ? 'approved' : 'rejected'} by admin ${adminUserId}`);

        return new Response(JSON.stringify({
            data: {
                consultant: updatedConsultant[0],
                message: `Consultant ${approved ? 'approved' : 'rejected'} successfully`,
                approvedBy: adminUserId,
                approvedAt: approved ? updateData.approved_at : null
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Approve consultant error:', error);

        const errorResponse = {
            error: {
                code: 'APPROVAL_FAILED',
                message: error.message
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
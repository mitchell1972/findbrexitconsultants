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
        const {
            requesterName,
            requesterEmail,
            requesterPhone,
            companyName,
            companySize,
            industry,
            projectDescription,
            budgetRange,
            timeline,
            preferredContact,
            serviceTypes,
            locationPreference
        } = await req.json();

        // Validate required fields
        if (!requesterName || !requesterEmail || !projectDescription) {
            throw new Error('Missing required fields: name, email, and project description are required');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(requesterEmail)) {
            throw new Error('Invalid email format');
        }

        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const supabaseUrl = Deno.env.get('SUPABASE_URL');

        if (!serviceRoleKey || !supabaseUrl) {
            throw new Error('Supabase configuration missing');
        }

        // Insert quote request
        const quoteRequestData = {
            requester_name: requesterName,
            requester_email: requesterEmail,
            requester_phone: requesterPhone || null,
            company_name: companyName || null,
            company_size: companySize || null,
            industry: industry || null,
            project_description: projectDescription,
            budget_range: budgetRange || null,
            timeline: timeline || null,
            preferred_contact: preferredContact || 'email',
            service_types: Array.isArray(serviceTypes) ? serviceTypes.join(',') : serviceTypes || null,
            location_preference: locationPreference || null,
            status: 'pending',
            created_at: new Date().toISOString()
        };

        const insertResponse = await fetch(`${supabaseUrl}/rest/v1/brexit_quote_requests`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(quoteRequestData)
        });

        if (!insertResponse.ok) {
            const errorText = await insertResponse.text();
            throw new Error(`Failed to create quote request: ${errorText}`);
        }

        const quoteRequest = await insertResponse.json();
        const quoteRequestId = quoteRequest[0].id;

        // Find matching consultants based on service types and location
        let consultantsQuery = `${supabaseUrl}/rest/v1/brexit_consultants?select=id,company_name,email,response_time_hours&verified=eq.true&approved_at=not.is.null`;
        
        const consultantsResponse = await fetch(consultantsQuery, {
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json'
            }
        });

        if (!consultantsResponse.ok) {
            console.log('Warning: Could not fetch consultants for matching');
        } else {
            const consultants = await consultantsResponse.json();
            
            // For now, notify up to 5 random consultants
            const selectedConsultants = consultants.slice(0, 5);
            
            // Send notifications to selected consultants (in a real app, you'd implement email notifications)
            console.log(`Quote request ${quoteRequestId} sent to ${selectedConsultants.length} consultants`);
        }

        return new Response(JSON.stringify({
            data: {
                quoteRequestId,
                message: 'Quote request submitted successfully',
                status: 'pending'
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Quote request error:', error);

        const errorResponse = {
            error: {
                code: 'QUOTE_REQUEST_FAILED',
                message: error.message
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
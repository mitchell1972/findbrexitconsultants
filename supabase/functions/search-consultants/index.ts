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
        const url = new URL(req.url);
        const searchParams = url.searchParams;

        // Extract search parameters
        const query = searchParams.get('query') || '';
        const serviceTypes = searchParams.get('serviceTypes')?.split(',').filter(Boolean) || [];
        const industries = searchParams.get('industries')?.split(',').filter(Boolean) || [];
        const locations = searchParams.get('locations')?.split(',').filter(Boolean) || [];
        const pricingLevel = searchParams.get('pricingLevel') ? parseInt(searchParams.get('pricingLevel')!) : null;
        const verifiedOnly = searchParams.get('verifiedOnly') === 'true';
        const freeConsultation = searchParams.get('freeConsultation') === 'true';
        const sortBy = searchParams.get('sortBy') || 'relevance';
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = (page - 1) * limit;

        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const supabaseUrl = Deno.env.get('SUPABASE_URL');

        if (!serviceRoleKey || !supabaseUrl) {
            throw new Error('Supabase configuration missing');
        }

        // Build the base query
        let consultantsQuery = `${supabaseUrl}/rest/v1/brexit_consultants?select=*`;
        let filters = [];
        
        // Only show approved consultants
        filters.push('approved_at=not.is.null');
        
        if (verifiedOnly) {
            filters.push('verified=eq.true');
        }
        
        if (freeConsultation) {
            filters.push('free_consultation=eq.true');
        }
        
        if (pricingLevel) {
            filters.push(`pricing_level=lte.${pricingLevel}`);
        }
        
        if (query) {
            // Simple text search across multiple fields
            filters.push(`or=(company_name.ilike.*${query}*,description.ilike.*${query}*)`);
        }
        
        if (filters.length > 0) {
            consultantsQuery += '&' + filters.join('&');
        }
        
        // Add sorting
        switch (sortBy) {
            case 'rating':
                consultantsQuery += '&order=created_at.desc'; // Placeholder - would need to calculate avg rating
                break;
            case 'response_time':
                consultantsQuery += '&order=response_time_hours.asc';
                break;
            case 'newest':
                consultantsQuery += '&order=created_at.desc';
                break;
            case 'featured':
                consultantsQuery += '&order=featured.desc,created_at.desc';
                break;
            default:
                consultantsQuery += '&order=featured.desc,profile_views.desc,created_at.desc';
        }
        
        // Add pagination
        consultantsQuery += `&limit=${limit}&offset=${offset}`;

        console.log('Executing query:', consultantsQuery);

        const consultantsResponse = await fetch(consultantsQuery, {
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json'
            }
        });

        if (!consultantsResponse.ok) {
            const errorText = await consultantsResponse.text();
            throw new Error(`Failed to fetch consultants: ${errorText}`);
        }

        let consultants = await consultantsResponse.json();

        // Filter by service types if specified
        if (serviceTypes.length > 0) {
            const serviceQuery = `${supabaseUrl}/rest/v1/brexit_consultant_services?select=consultant_id,brexit_service_types(name,slug)&brexit_service_types.slug=in.(${serviceTypes.join(',')})`;
            
            const serviceResponse = await fetch(serviceQuery, {
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey
                }
            });
            
            if (serviceResponse.ok) {
                const serviceData = await serviceResponse.json();
                const consultantIds = serviceData.map((item: any) => item.consultant_id);
                consultants = consultants.filter((consultant: any) => consultantIds.includes(consultant.id));
            }
        }

        // Filter by industries if specified
        if (industries.length > 0) {
            const industryQuery = `${supabaseUrl}/rest/v1/brexit_consultant_industries?select=consultant_id,brexit_industries(name,slug)&brexit_industries.slug=in.(${industries.join(',')})`;
            
            const industryResponse = await fetch(industryQuery, {
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey
                }
            });
            
            if (industryResponse.ok) {
                const industryData = await industryResponse.json();
                const consultantIds = industryData.map((item: any) => item.consultant_id);
                consultants = consultants.filter((consultant: any) => consultantIds.includes(consultant.id));
            }
        }

        // Filter by locations if specified
        if (locations.length > 0) {
            const locationQuery = `${supabaseUrl}/rest/v1/brexit_consultant_locations?select=consultant_id,brexit_locations(name,slug)&brexit_locations.slug=in.(${locations.join(',')})`;
            
            const locationResponse = await fetch(locationQuery, {
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey
                }
            });
            
            if (locationResponse.ok) {
                const locationData = await locationResponse.json();
                const consultantIds = locationData.map((item: any) => item.consultant_id);
                consultants = consultants.filter((consultant: any) => consultantIds.includes(consultant.id));
            }
        }

        // Get total count for pagination
        const totalCount = consultants.length;

        return new Response(JSON.stringify({
            data: {
                consultants,
                pagination: {
                    page,
                    limit,
                    total: totalCount,
                    totalPages: Math.ceil(totalCount / limit)
                },
                filters: {
                    query,
                    serviceTypes,
                    industries,
                    locations,
                    pricingLevel,
                    verifiedOnly,
                    freeConsultation,
                    sortBy
                }
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Search consultants error:', error);

        const errorResponse = {
            error: {
                code: 'SEARCH_FAILED',
                message: error.message
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
CREATE TABLE brexit_quote_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_request_id UUID REFERENCES brexit_quote_requests(id) ON DELETE CASCADE,
    consultant_id UUID REFERENCES brexit_consultants(id) ON DELETE CASCADE,
    interested BOOLEAN DEFAULT true,
    quote_amount DECIMAL(10,2),
    quote_details TEXT,
    response_time_days INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(quote_request_id,
    consultant_id)
);
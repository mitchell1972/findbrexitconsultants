CREATE TABLE brexit_quote_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_name VARCHAR(255) NOT NULL,
    requester_email VARCHAR(255) NOT NULL,
    requester_phone VARCHAR(50),
    company_name VARCHAR(255),
    company_size VARCHAR(50),
    industry VARCHAR(100),
    project_description TEXT NOT NULL,
    budget_range VARCHAR(50),
    timeline VARCHAR(100),
    preferred_contact VARCHAR(50) DEFAULT 'email',
    service_types TEXT,
    location_preference VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
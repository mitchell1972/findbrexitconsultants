CREATE TABLE brexit_consultant_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consultant_id UUID REFERENCES brexit_consultants(id) ON DELETE CASCADE,
    service_id INTEGER REFERENCES brexit_service_types(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(consultant_id,
    service_id)
);
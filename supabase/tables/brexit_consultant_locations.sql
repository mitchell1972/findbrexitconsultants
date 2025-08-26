CREATE TABLE brexit_consultant_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consultant_id UUID REFERENCES brexit_consultants(id) ON DELETE CASCADE,
    location_id INTEGER REFERENCES brexit_locations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(consultant_id,
    location_id)
);
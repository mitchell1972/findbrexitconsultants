CREATE TABLE brexit_consultant_industries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consultant_id UUID REFERENCES brexit_consultants(id) ON DELETE CASCADE,
    industry_id INTEGER REFERENCES brexit_industries(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(consultant_id,
    industry_id)
);
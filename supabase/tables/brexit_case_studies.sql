CREATE TABLE brexit_case_studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consultant_id UUID REFERENCES brexit_consultants(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    industry VARCHAR(100),
    project_type VARCHAR(100),
    challenge TEXT,
    solution TEXT,
    results TEXT,
    project_value VARCHAR(50),
    duration_months INTEGER,
    client_testimonial TEXT,
    image_url TEXT,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
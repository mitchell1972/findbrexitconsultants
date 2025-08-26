CREATE TABLE brexit_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consultant_id UUID REFERENCES brexit_consultants(id) ON DELETE CASCADE,
    business_name VARCHAR(255),
    reviewer_name VARCHAR(255),
    reviewer_email VARCHAR(255),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    project_type VARCHAR(100),
    project_value VARCHAR(50),
    verified BOOLEAN DEFAULT false,
    response_text TEXT,
    responded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
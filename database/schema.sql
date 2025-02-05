-- Create images table
CREATE TABLE IF NOT EXISTS images (
    id SERIAL PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    public_id VARCHAR(255) NOT NULL,
    tags JSONB DEFAULT '[]'::jsonb,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on tags for faster searching
CREATE INDEX IF NOT EXISTS idx_images_tags ON images USING GIN (tags);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_images_created_at ON images (created_at DESC);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_images_updated_at
    BEFORE UPDATE ON images
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 
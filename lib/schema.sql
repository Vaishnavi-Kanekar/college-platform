-- College Discovery Platform Schema

CREATE TABLE IF NOT EXISTS colleges (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL, -- IIT, NIT, Private, Deemed, Central
  rating DECIMAL(3,1) NOT NULL,
  total_fees INTEGER NOT NULL, -- in INR per year
  established INTEGER,
  naac_grade VARCHAR(5),
  nirf_rank INTEGER,
  placement_percentage INTEGER,
  avg_package INTEGER, -- in LPA (lakhs per annum)
  highest_package INTEGER, -- in LPA
  total_students INTEGER,
  image_url TEXT,
  description TEXT,
  website VARCHAR(255),
  entrance_exams TEXT[], -- ['JEE Main', 'JEE Advanced', 'CAT', etc.]
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  college_id INTEGER REFERENCES colleges(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  duration INTEGER NOT NULL, -- in years
  degree VARCHAR(100) NOT NULL, -- B.Tech, M.Tech, MBA, etc.
  fees INTEGER NOT NULL, -- per year in INR
  seats INTEGER,
  cutoff_rank INTEGER -- for JEE/other entrance
);

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  college_id INTEGER REFERENCES colleges(id) ON DELETE CASCADE,
  reviewer_name VARCHAR(100) NOT NULL,
  batch_year INTEGER,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  content TEXT,
  pros TEXT,
  cons TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_colleges_location ON colleges(state);
CREATE INDEX IF NOT EXISTS idx_colleges_fees ON colleges(total_fees);
CREATE INDEX IF NOT EXISTS idx_colleges_rating ON colleges(rating DESC);
CREATE INDEX IF NOT EXISTS idx_colleges_nirf ON colleges(nirf_rank);
-- Add rating columns to Supabase database
-- Run this in your Supabase SQL Editor

-- Add rating columns to the country table
ALTER TABLE country 
ADD COLUMN IF NOT EXISTS "overallRating" INTEGER,
ADD COLUMN IF NOT EXISTS "costRating" INTEGER,
ADD COLUMN IF NOT EXISTS "safetyRating" INTEGER,
ADD COLUMN IF NOT EXISTS "funRating" INTEGER,
ADD COLUMN IF NOT EXISTS "foodRating" INTEGER;

-- Add rating columns to the city table  
ALTER TABLE city
ADD COLUMN IF NOT EXISTS "overallRating" INTEGER,
ADD COLUMN IF NOT EXISTS "costRating" INTEGER,
ADD COLUMN IF NOT EXISTS "safetyRating" INTEGER,
ADD COLUMN IF NOT EXISTS "funRating" INTEGER,
ADD COLUMN IF NOT EXISTS "foodRating" INTEGER;

-- Sample rating data for popular countries
UPDATE country SET 
    "overallRating" = 92,
    "costRating" = 25,
    "safetyRating" = 88,
    "funRating" = 85,
    "foodRating" = 75
WHERE name = 'Maldives';

UPDATE country SET 
    "overallRating" = 89,
    "costRating" = 85,
    "safetyRating" = 82,
    "funRating" = 93,
    "foodRating" = 95
WHERE name = 'Thailand';

UPDATE country SET 
    "overallRating" = 85,
    "costRating" = 40,
    "safetyRating" = 90,
    "funRating" = 88,
    "foodRating" = 92
WHERE name = 'France';

UPDATE country SET 
    "overallRating" = 88,
    "costRating" = 45,
    "safetyRating" = 85,
    "funRating" = 90,
    "foodRating" = 95
WHERE name = 'Italy';

UPDATE country SET 
    "overallRating" = 86,
    "costRating" = 50,
    "safetyRating" = 88,
    "funRating" = 85,
    "foodRating" = 90
WHERE name = 'Spain';

UPDATE country SET 
    "overallRating" = 83,
    "costRating" = 55,
    "safetyRating" = 92,
    "funRating" = 80,
    "foodRating" = 85
WHERE name = 'Germany';

UPDATE country SET 
    "overallRating" = 87,
    "costRating" = 35,
    "safetyRating" = 85,
    "funRating" = 88,
    "foodRating" = 88
WHERE name = 'Greece';

UPDATE country SET 
    "overallRating" = 84,
    "costRating" = 50,
    "safetyRating" = 90,
    "funRating" = 82,
    "foodRating" = 87
WHERE name = 'Portugal';

UPDATE country SET 
    "overallRating" = 90,
    "costRating" = 30,
    "safetyRating" = 95,
    "funRating" = 85,
    "foodRating" = 80
WHERE name = 'Japan';

UPDATE country SET 
    "overallRating" = 86,
    "costRating" = 75,
    "safetyRating" = 88,
    "funRating" = 92,
    "foodRating" = 90
WHERE name = 'Indonesia';

-- Sample rating data for popular cities
UPDATE city SET 
    "overallRating" = 87,
    "costRating" = 88,
    "safetyRating" = 78,
    "funRating" = 92,
    "foodRating" = 96
WHERE name = 'Bangkok';

UPDATE city SET 
    "overallRating" = 85,
    "costRating" = 90,
    "safetyRating" = 85,
    "funRating" = 82,
    "foodRating" = 88
WHERE name = 'Chiang Mai';

UPDATE city SET 
    "overallRating" = 88,
    "costRating" = 35,
    "safetyRating" = 85,
    "funRating" = 90,
    "foodRating" = 95
WHERE name = 'Paris';

UPDATE city SET 
    "overallRating" = 86,
    "costRating" = 40,
    "safetyRating" = 88,
    "funRating" = 88,
    "foodRating" = 92
WHERE name = 'Rome';

UPDATE city SET 
    "overallRating" = 84,
    "costRating" = 45,
    "safetyRating" = 90,
    "funRating" = 85,
    "foodRating" = 90
WHERE name = 'Barcelona';

-- You can add more cities and countries as needed
-- Rating scale: 20-100 (as requested)
-- overallRating: Overall experience rating
-- costRating: Cost effectiveness (lower number = more expensive, higher = more affordable)
-- safetyRating: Safety rating
-- funRating: Fun/entertainment rating  
-- foodRating: Food quality rating

# Supabase Setup for Country Data

This application has been updated to fetch country data from a Supabase database instead of using mock data.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Schema

The application expects a `country` table in your Supabase database with the following structure:

```sql
CREATE TABLE country (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  image TEXT,
  featured BOOLEAN DEFAULT false,
  continent VARCHAR,
  mood TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Sample Data

Here's some sample data you can insert into your `country` table:

```sql
INSERT INTO country (name, image, featured, continent, mood) VALUES
('Thailand', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true, 'Asia', ARRAY['vibrant', 'cultural', 'affordable', 'tropical']),
('Indonesia', 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', false, 'Asia', ARRAY['beach', 'islands', 'relaxed', 'spiritual']),
('Japan', 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', false, 'Asia', ARRAY['modern', 'tech', 'urban', 'efficient']);
```

## Fallback Data

If Supabase is not configured or unavailable, the application will automatically fall back to using mock data to ensure the site continues to function.

## Files Modified

- `types.d.ts` - Added `Country` type definition
- `lib/supabase.ts` - Supabase client configuration
- `lib/getAllCountries.tsx` - Function to fetch countries from Supabase with fallback
- `app/(default)/posts-list.tsx` - Updated to use countries instead of destinations
- `app/(default)/post-item.tsx` - Updated to display country data appropriately

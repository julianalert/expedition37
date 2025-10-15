# Itinerary Feature Setup Guide

## Overview
The new Itinerary feature allows users to create personalized travel itineraries for any country or city using AI-powered recommendations from OpenAI.

## Features Implemented

### 1. New Tab in Navigation
- Added "Itinerary" tab before "Alternatives" in both country and city pages
- Tab is fully integrated with the existing navigation system

### 2. Itinerary Pages
- **City Itinerary**: `/[countryname]/[cityname]/itinerary`
- **Country Itinerary**: `/[countryname]/itinerary`

### 3. User Interface
- Input field for user interests/activities
- Dropdown for trip duration (1 day, 2 days, 3 days, 5 days, 1 week, 2 weeks, 1 month)
- "Create my personalized itinerary" button
- Loading state with animation during AI generation
- Display of generated itinerary in a styled container
- Option to create a new itinerary after viewing results

### 4. API Integration
- OpenAI API endpoint: `/api/itinerary`
- Uses GPT-4o-mini model for cost-effective, high-quality responses
- Generates detailed day-by-day itineraries based on:
  - Destination
  - User interests
  - Trip duration

### 5. SEO Optimization
- Complete metadata for both country and city itinerary pages
- Open Graph tags for social sharing
- Twitter card support
- Optimized titles, descriptions, and keywords

## Setup Instructions

### 1. Get an OpenAI API Key
1. Go to [OpenAI's Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API keys section
4. Create a new API key
5. Copy the key (you won't be able to see it again)

### 2. Add the API Key to Your Environment
Create a `.env.local` file in the root of your project (if it doesn't exist) and add:

```bash
OPENAI_API_KEY=your-api-key-here
```

**Important:** 
- Never commit your `.env.local` file to version control
- Make sure `.env.local` is in your `.gitignore` file

### 3. Restart Your Development Server
After adding the environment variable, restart your Next.js development server:

```bash
npm run dev
```

## Usage

### For Users
1. Navigate to any country or city page
2. Click on the "Itinerary" tab
3. Enter what you want to do (e.g., "Visit museums, try local food, explore historic sites")
4. Select your trip duration from the dropdown
5. Click "Create my personalized itinerary"
6. Wait a few moments while the AI generates your personalized itinerary
7. View your custom itinerary and save/copy it as needed

## Technical Details

### Files Created
- `/app/[countryname]/[cityname]/itinerary.tsx` - City itinerary component
- `/app/[countryname]/[cityname]/itinerary/page.tsx` - City itinerary page with metadata
- `/app/[countryname]/itinerary.tsx` - Country itinerary component
- `/app/[countryname]/itinerary/page.tsx` - Country itinerary page with metadata
- `/app/api/itinerary/route.ts` - API route for OpenAI integration

### Files Modified
- `/app/[countryname]/[cityname]/place-tabs.tsx` - Added itinerary tab
- `/app/[countryname]/country-tabs.tsx` - Added itinerary tab
- `/app/[countryname]/country-layout-client.tsx` - Added 'itinerary' to countryTabs array

### Dependencies Added
- `react-markdown` - For rendering markdown output from OpenAI in a user-friendly format

### API Costs
The feature uses GPT-4o-mini, which is one of OpenAI's most cost-effective models:
- Input: ~$0.15 per 1M tokens
- Output: ~$0.60 per 1M tokens

Each itinerary generation typically uses ~500-1000 tokens, making it very affordable.

## Error Handling
The feature includes comprehensive error handling:
- Missing API key detection
- API call failures
- Empty responses
- User input validation
- Loading states

## Future Enhancements
Potential improvements for the future:
- Save itineraries to user accounts
- Export itineraries as PDF
- Share itineraries via link
- Integrate with calendar apps
- Add more customization options (budget level, travel style, etc.)
- Support for multiple languages


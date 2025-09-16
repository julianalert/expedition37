export default async function getAllDestinations() {
    // Mock destination data with placeholder images from Unsplash
    const destinations = [
        {
            id: 1,
            rank: 1,
            city: "Bangkok",
            country: "Thailand",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            featured: true,
            continent: "Asia",
            mood: ["vibrant", "cultural", "affordable"]
        },
        {
            id: 2,
            rank: 2,
            city: "Canggu",
            country: "Bali, Indonesia",
            image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            featured: false,
            continent: "Asia",
            mood: ["beach", "surf", "relaxed", "spiritual"]
        },
        {
            id: 3,
            rank: 3,
            city: "Chiang Mai",
            country: "Thailand",
            image: "https://images.unsplash.com/photo-1596622897385-0086202d383d?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            featured: true,
            continent: "Asia",
            mood: ["cultural", "peaceful", "affordable", "temples"]
        },
        {
            id: 4,
            rank: 4,
            city: "Kuala Lumpur",
            country: "Malaysia",
            image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            featured: false,
            continent: "Asia",
            mood: ["modern", "multicultural", "urban", "affordable"]
        },
        {
            id: 5,
            rank: 5,
            city: "Tbilisi",
            country: "Georgia",
            image: "https://images.unsplash.com/photo-1603350576276-24747f7bbf40?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGJpbGlzaXxlbnwwfHwwfHx8MA%3D%3D",
            featured: false,
            continent: "Europe",
            mood: ["historic", "affordable", "emerging", "cultural"]
        },
        {
            id: 6,
            rank: 6,
            city: "Tokyo",
            country: "Japan",
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            featured: false,
            continent: "Asia",
            mood: ["modern", "tech", "urban", "efficient"]
        },
        {
            id: 7,
            rank: 7,
            city: "Lisbon",
            country: "Portugal",
            image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            featured: false,
            continent: "Europe",
            mood: ["coastal", "historic", "affordable", "charming"]
        },
        {
            id: 8,
            rank: 8,
            city: "Mexico City",
            country: "Mexico",
            image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            featured: false,
            continent: "North America",
            mood: ["vibrant", "cultural", "affordable", "artistic"]
        },
        {
            id: 9,
            rank: 9,
            city: "Buenos Aires",
            country: "Argentina",
            image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            featured: false,
            continent: "South America",
            mood: ["tango", "cultural", "nightlife", "affordable"]
        },
        {
            id: 10,
            rank: 10,
            city: "Prague",
            country: "Czech Republic",
            image: "https://images.unsplash.com/photo-1541849546-216549ae216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            featured: false,
            continent: "Europe",
            mood: ["historic", "affordable", "charming", "beer"]
        },
        {
            id: 11,
            rank: 11,
            city: "Medellín",
            country: "Colombia",
            image: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            featured: false,
            continent: "South America",
            mood: ["emerging", "affordable", "spring-weather", "innovative"]
        },
        {
            id: 12,
            rank: 12,
            city: "Cape Town",
            country: "South Africa",
            image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            featured: true,
            continent: "Africa",
            mood: ["scenic", "wine", "adventure", "coastal"]
        },
        {
            id: 13,
            rank: 13,
            city: "Dubai",
            country: "UAE",
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            featured: false,
            continent: "Asia",
            mood: ["luxury", "modern", "desert", "shopping"]
        },
        {
            id: 14,
            rank: 14,
            city: "Istanbul",
            country: "Turkey",
            image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            featured: false,
            continent: "Europe",
            mood: ["historic", "cultural", "bridge-cultures", "affordable"]
        },
        {
            id: 15,
            rank: 15,
            city: "Ho Chi Minh City",
            country: "Vietnam",
            image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            featured: false,
            continent: "Asia",
            mood: ["vibrant", "street-food", "affordable", "motorbikes"]
        },
        {
            id: 16,
            rank: 16,
            city: "Barcelona",
            country: "Spain",
            image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            featured: false,
            continent: "Europe",
            mood: ["artistic", "coastal", "vibrant", "architecture"]
        },
        {
            id: 17,
            rank: 17,
            city: "Playa del Carmen",
            country: "Mexico",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            featured: false,
            continent: "North America",
            mood: ["beach", "party", "cenotes", "diving"]
        },
        {
            id: 18,
            rank: 18,
            city: "Berlin",
            country: "Germany",
            image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVybGlufGVufDB8fDB8fHww",
            featured: false,
            continent: "Europe",
            mood: ["alternative", "nightlife", "historic", "affordable"]
        }
    ];

    return destinations;
}

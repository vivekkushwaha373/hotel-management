const mongoose = require('mongoose');
const Destination = require('../models/Destination');
const Hotel = require('../models/Hotel');
require('dotenv').config({ path: './config.env' });

const sampleDestinations = [
  {
    name: "Paris",
    country: "France",
    description: "The capital city of France, known for art, fashion, and the Eiffel Tower.",
    coordinates: {
      lat: 48.8566,
      lon: 2.3522
    }
  },
  {
    name: "Tokyo",
    country: "Japan",
    description: "A bustling metropolis that seamlessly blends the ultramodern with the traditional.",
    coordinates: {
      lat: 35.6762,
      lon: 139.6503
    }
  },
  {
    name: "New York",
    country: "USA",
    description: "The Big Apple, a global center for finance, culture, and entertainment.",
    coordinates: {
      lat: 40.7128,
      lon: -74.0060
    }
  },
  {
    name: "Dubai",
    country: "UAE",
    description: "A futuristic city known for its luxury shopping, ultramodern architecture, and vibrant nightlife.",
    coordinates: {
      lat: 25.2048,
      lon: 55.2708
    }
  },
  {
    name: "Sydney",
    country: "Australia",
    description: "A vibrant coastal city known for its stunning harbor, iconic Opera House, and beautiful beaches.",
    coordinates: {
      lat: -33.8688,
      lon: 151.2093
    }
  }
];

const sampleHotels = [
  {
    name: "Hotel de Lumière",
    address: "123 Champs-Élysées, Paris, France",
    stars: 5,
    rating: 4.7,
    priceFrom: 200,
    roomTypes: [
      {
        name: "Deluxe Room",
        price: 250,
        facilities: ["Free Wi-Fi", "King Bed", "AC", "Balcony"]
      },
      {
        name: "Suite",
        price: 400,
        facilities: ["Free Wi-Fi", "Living Area", "Mini Bar", "Jacuzzi"]
      }
    ],
    nearbyAttractions: [
      {
        name: "Eiffel Tower",
        distance: "2.1 km"
      },
      {
        name: "Louvre Museum",
        distance: "1.5 km"
      }
    ],
    photos: [
      {
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
      }
    ]
  },
  {
    name: "Tokyo Grand Hotel",
    address: "456 Shibuya Crossing, Tokyo, Japan",
    stars: 4,
    rating: 4.5,
    priceFrom: 150,
    roomTypes: [
      {
        name: "Standard Room",
        price: 150,
        facilities: ["Free Wi-Fi", "Queen Bed", "AC", "City View"]
      },
      {
        name: "Executive Room",
        price: 280,
        facilities: ["Free Wi-Fi", "King Bed", "AC", "Balcony", "Mini Bar"]
      }
    ],
    nearbyAttractions: [
      {
        name: "Shibuya Crossing",
        distance: "0.1 km"
      },
      {
        name: "Tokyo Tower",
        distance: "3.2 km"
      }
    ],
    photos: [
      {
        url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800"
      }
    ]
  },
  {
    name: "Manhattan Luxury Hotel",
    address: "789 5th Avenue, New York, USA",
    stars: 5,
    rating: 4.8,
    priceFrom: 300,
    roomTypes: [
      {
        name: "Deluxe Suite",
        price: 350,
        facilities: ["Free Wi-Fi", "King Bed", "AC", "Central Park View"]
      },
      {
        name: "Presidential Suite",
        price: 800,
        facilities: ["Free Wi-Fi", "Multiple Bedrooms", "AC", "Terrace", "Butler Service"]
      }
    ],
    nearbyAttractions: [
      {
        name: "Central Park",
        distance: "0.5 km"
      },
      {
        name: "Times Square",
        distance: "1.2 km"
      }
    ],
    photos: [
      {
        url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"
      }
    ]
  },
  {
    name: "Burj Al Arab View Hotel",
    address: "321 Sheikh Zayed Road, Dubai, UAE",
    stars: 5,
    rating: 4.9,
    priceFrom: 400,
    roomTypes: [
      {
        name: "Ocean View Room",
        price: 450,
        facilities: ["Free Wi-Fi", "King Bed", "AC", "Ocean View", "Private Pool"]
      },
      {
        name: "Royal Suite",
        price: 1200,
        facilities: ["Free Wi-Fi", "Multiple Bedrooms", "AC", "Private Beach", "Helicopter Service"]
      }
    ],
    nearbyAttractions: [
      {
        name: "Burj Khalifa",
        distance: "2.0 km"
      },
      {
        name: "Dubai Mall",
        distance: "1.8 km"
      }
    ],
    photos: [
      {
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
      }
    ]
  },
  {
    name: "Harbor View Hotel",
    address: "654 Circular Quay, Sydney, Australia",
    stars: 4,
    rating: 4.6,
    priceFrom: 180,
    roomTypes: [
      {
        name: "Harbor View Room",
        price: 200,
        facilities: ["Free Wi-Fi", "Queen Bed", "AC", "Harbor View"]
      },
      {
        name: "Executive Suite",
        price: 350,
        facilities: ["Free Wi-Fi", "King Bed", "AC", "Balcony", "Opera House View"]
      }
    ],
    nearbyAttractions: [
      {
        name: "Sydney Opera House",
        distance: "0.3 km"
      },
      {
        name: "Sydney Harbour Bridge",
        distance: "0.8 km"
      }
    ],
    photos: [
      {
        url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800"
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://kritisingh3921:vBmBbmlprkxGlvSx@hotel.z1g8gcs.mongodb.net/hotel-mangement?retryWrites=true&w=majority&appName=hotel', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await Destination.deleteMany({});
    await Hotel.deleteMany({});

    console.log('Cleared existing data');

    // Insert destinations
    const createdDestinations = await Destination.insertMany(sampleDestinations);
    console.log(`Inserted ${createdDestinations.length} destinations`);

    // Insert hotels with destination references
    const hotelsWithDestinations = sampleHotels.map((hotel, index) => ({
      ...hotel,
      destinationId: createdDestinations[index]._id
    }));

    const createdHotels = await Hotel.insertMany(hotelsWithDestinations);
    console.log(`Inserted ${createdHotels.length} hotels`);

    console.log('Database seeded successfully!');
    console.log('\nSample data created:');
    console.log('- Destinations:', createdDestinations.map(d => `${d.name}, ${d.country}`));
    console.log('- Hotels:', createdHotels.map(h => h.name));

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase; 
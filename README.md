# Hotel & Destination Manager

A full-stack web application built with React, Express.js, and MongoDB that demonstrates nested MongoDB structures, dependent collections, and CRUD operations.

## Features

- **Nested MongoDB Structures**: Complex hotel data with room types, facilities, and attractions
- **Dependent Collections**: Hotels are linked to destinations with proper references
- **CRUD Operations**: Full Create, Read, Update, Delete functionality for both hotels and destinations
- **Dynamic Schemas**: MongoDB schemas that allow additional properties not defined in the schema
- **Modern UI**: Beautiful React frontend with Tailwind CSS
- **RESTful API**: Complete Express.js backend with proper error handling

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Axios** for API communication

### Backend
- **Express.js** for the server
- **MongoDB** with Mongoose ODM
- **CORS** for cross-origin requests
- **Helmet** for security headers
- **Morgan** for logging

## Project Structure

```
assignment/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   ├── types/          # TypeScript interfaces
│   │   ├── App.tsx         # Main application component
│   │   └── main.tsx        # Application entry point
│   ├── package.json
│   └── vite.config.ts
├── backend/                  # Express.js backend application
│   ├── config/             # Database configuration
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── seeders/            # Database seeding
│   ├── server.js           # Main server file
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd assignment
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Update the connection string in `backend/config.env` if needed

5. **Seed the Database**
   ```bash
   cd backend
   node seeders/seedData.js
   ```

6. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

7. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## API Endpoints

### Destinations
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/:id` - Get destination by ID
- `POST /api/destinations` - Create new destination
- `PUT /api/destinations/:id` - Update destination
- `DELETE /api/destinations/:id` - Delete destination
- `GET /api/destinations/country/:country` - Get destinations by country

### Hotels
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get hotel by ID
- `GET /api/hotels/destination/:destinationId` - Get hotels by destination
- `POST /api/hotels` - Create new hotel
- `PUT /api/hotels/:id` - Update hotel
- `DELETE /api/hotels/:id` - Delete hotel
- `GET /api/hotels/price/:minPrice/:maxPrice` - Get hotels by price range
- `GET /api/hotels/stars/:stars` - Get hotels by star rating
- `GET /api/hotels/search/filter` - Advanced hotel filtering

## Data Models

### Destination Schema
```javascript
{
  name: String (required),
  country: String (required),
  description: String (required),
  coordinates: {
    lat: Number (required),
    lon: Number (required)
  },
  // Additional dynamic properties allowed
}
```

### Hotel Schema
```javascript
{
  name: String (required),
  address: String (required),
  stars: Number (1-5, required),
  rating: Number (0-5, required),
  priceFrom: Number (required),
  roomTypes: [{
    name: String,
    price: Number,
    facilities: [String]
  }],
  nearbyAttractions: [{
    name: String,
    distance: String
  }],
  photos: [{
    url: String
  }],
  destinationId: ObjectId (reference to Destination, required)
  // Additional dynamic properties allowed
}
```

## Key Features Demonstrated

1. **Nested MongoDB Structures**: Hotels contain complex nested data like room types with facilities, nearby attractions, and photos.

2. **Dependent Collections**: Hotels reference destinations through `destinationId`, creating a proper relationship between collections.

3. **Dynamic Schemas**: Both models use `strict: false`, allowing additional properties to be saved even if not defined in the schema.

4. **CRUD Operations**: Complete Create, Read, Update, Delete functionality for both entities.

5. **API Integration**: Frontend uses Axios to communicate with the backend APIs.

6. **Modern UI**: Clean, responsive interface built with React and Tailwind CSS.

## Sample Data

The application comes with sample data for 5 destinations and 5 hotels:
- Paris, France
- Tokyo, Japan
- New York, USA
- Dubai, UAE
- Sydney, Australia

Each destination has a corresponding hotel with detailed information including room types, facilities, nearby attractions, and photos.

## Development

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend Development
```bash
cd backend
npm run dev          # Start development server with nodemon
npm start           # Start production server
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 
# Quick Start Guide

## Prerequisites

1. **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - Install locally or use MongoDB Atlas
3. **Git** (optional, for cloning)

## Quick Setup (Windows)

1. **Run the start script:**
   ```bash
   start.bat
   ```
   
   This will automatically:
   - Install all dependencies
   - Seed the database with sample data
   - Start both frontend and backend servers

## Manual Setup

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Set up MongoDB

**Option A: Local MongoDB**
- Install MongoDB Community Server
- Start MongoDB service
- The app will connect to `mongodb://localhost:27017/hotel_destination_db`

**Option B: MongoDB Atlas**
- Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Get your connection string
- Update `backend/config.env` with your connection string

### 3. Seed the Database

```bash
cd backend
node seeders/seedData.js
```

This will create sample data:
- 5 destinations (Paris, Tokyo, New York, Dubai, Sydney)
- 5 hotels (one for each destination)

### 4. Start the Application

**Option A: Start both servers simultaneously**
```bash
# From the root directory
npm run dev
```

**Option B: Start servers separately**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

## Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000

## Features to Test

1. **View Destinations**: Select a destination from the dropdown
2. **View Hotels**: See hotels for the selected destination
3. **Add Hotel**: Click "Add New Hotel" to create a new hotel
4. **Edit Hotel**: Click "Edit" on any hotel card
5. **Delete Hotel**: Click "Delete" on any hotel card
6. **Nested Data**: Explore room types, facilities, and attractions

## API Testing

You can test the API endpoints using tools like Postman or curl:

```bash
# Get all destinations
curl http://localhost:5000/api/destinations

# Get hotels for a specific destination
curl http://localhost:5000/api/hotels/destination/[destination-id]

# Create a new hotel
curl -X POST http://localhost:5000/api/hotels \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Hotel","address":"123 Test St","stars":4,"rating":4.5,"priceFrom":150,"destinationId":"[destination-id]"}'
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the connection string in `backend/config.env`
- For Atlas, make sure your IP is whitelisted

### Port Already in Use
- Backend: Change PORT in `backend/config.env`
- Frontend: Vite will automatically find an available port

### Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

## Project Structure

```
assignment/
├── frontend/          # React + Vite + Tailwind CSS
├── backend/           # Express.js + MongoDB
├── package.json       # Root scripts
├── start.bat         # Windows startup script
└── README.md         # Detailed documentation
```

## Next Steps

1. Explore the code structure
2. Add new destinations and hotels
3. Customize the UI with Tailwind CSS
4. Add authentication and user management
5. Implement image upload functionality
6. Add search and filtering features

## Support

If you encounter any issues:
1. Check the console for error messages
2. Ensure all dependencies are installed
3. Verify MongoDB is running
4. Check the README.md for detailed documentation 
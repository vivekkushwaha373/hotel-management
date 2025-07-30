import React from 'react';
import { Hotel } from '../types';

interface HotelCardProps {
  hotel: Hotel;
  onEdit: (hotel: Hotel) => void;
  onDelete: (id: string) => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onEdit, onDelete }) => {
  const renderStars = (stars: number) => {
    return '⭐'.repeat(stars);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{hotel.name}</h3>
          <p className="text-gray-600 mb-1">{hotel.address}</p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-500">{renderStars(hotel.stars)}</span>
            <span className="text-gray-600">({hotel.rating}/5)</span>
          </div>
          <p className="text-green-600 font-semibold">From ${hotel.priceFrom}/night</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(hotel)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(hotel._id!)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Room Types */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">Room Types:</h4>
        <div className="space-y-2">
          {hotel.roomTypes.map((room, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded">
              <div className="flex justify-between items-center">
                <span className="font-medium">{room.name}</span>
                <span className="text-green-600">${room.price}/night</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Facilities: {room.facilities.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Attractions */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">Nearby Attractions:</h4>
        <div className="space-y-1">
          {hotel.nearbyAttractions.map((attraction, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>{attraction.name}</span>
              <span className="text-gray-500">{attraction.distance}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Photos */}
      {hotel.photos && hotel.photos.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Photos:</h4>
          <div className="flex gap-2 overflow-x-auto">
            {hotel.photos.map((photo, index) => (
              <img
                key={index}
                src={photo.url}
                alt={`Hotel ${index + 1}`}
                className="w-20 h-20 object-cover rounded"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/80x80?text=Photo';
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelCard; 
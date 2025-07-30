import React, { useState, useEffect } from 'react';
import { Hotel, Destination, RoomType, NearbyAttraction, Photo } from '../types';

interface HotelFormProps {
  hotel?: Hotel;
  destinations: Destination[];
  onSubmit: (hotel: Hotel) => void;
  onCancel: () => void;
}

const HotelForm: React.FC<HotelFormProps> = ({ hotel, destinations, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Hotel>>({
    name: '',
    address: '',
    stars: 3,
    rating: 4.0,
    priceFrom: 100,
    roomTypes: [],
    nearbyAttractions: [],
    photos: [],
    destinationId: '',
  });

  const [newRoomType, setNewRoomType] = useState<Partial<RoomType>>({
    name: '',
    price: 0,
    facilities: [],
  });

  const [newAttraction, setNewAttraction] = useState<Partial<NearbyAttraction>>({
    name: '',
    distance: '',
  });

  const [newPhoto, setNewPhoto] = useState<Partial<Photo>>({
    url: '',
  });

  const [newFacility, setNewFacility] = useState('');

  useEffect(() => {
    if (hotel) {
      setFormData(hotel);
    }
  }, [hotel]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'stars' || name === 'rating' || name === 'priceFrom' ? Number(value) : value,
    }));
  };

  const addRoomType = () => {
    if (newRoomType.name && newRoomType.price) {
      setFormData(prev => ({
        ...prev,
        roomTypes: [...(prev.roomTypes || []), newRoomType as RoomType],
      }));
      setNewRoomType({ name: '', price: 0, facilities: [] });
    }
  };

  const removeRoomType = (index: number) => {
    setFormData(prev => ({
      ...prev,
      roomTypes: prev.roomTypes?.filter((_, i) => i !== index),
    }));
  };

  const addFacility = () => {
    if (newFacility.trim()) {
      setNewRoomType(prev => ({
        ...prev,
        facilities: [...(prev.facilities || []), newFacility.trim()],
      }));
      setNewFacility('');
    }
  };

  const removeFacility = (index: number) => {
    setNewRoomType(prev => ({
      ...prev,
      facilities: prev.facilities?.filter((_, i) => i !== index),
    }));
  };

  const addAttraction = () => {
    if (newAttraction.name && newAttraction.distance) {
      setFormData(prev => ({
        ...prev,
        nearbyAttractions: [...(prev.nearbyAttractions || []), newAttraction as NearbyAttraction],
      }));
      setNewAttraction({ name: '', distance: '' });
    }
  };

  const removeAttraction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      nearbyAttractions: prev.nearbyAttractions?.filter((_, i) => i !== index),
    }));
  };

  const addPhoto = () => {
    if (newPhoto.url) {
      setFormData(prev => ({
        ...prev,
        photos: [...(prev.photos || []), newPhoto as Photo],
      }));
      setNewPhoto({ url: '' });
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.destinationId) {
      onSubmit(formData as Hotel);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">{hotel ? 'Edit Hotel' : 'Add New Hotel'}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stars</label>
            <select
              name="stars"
              value={formData.stars || 3}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5].map(star => (
                <option key={star} value={star}>{star} Star{star > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <input
              type="number"
              name="rating"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating || 4.0}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price From ($)</label>
            <input
              type="number"
              name="priceFrom"
              min="0"
              value={formData.priceFrom || 100}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
            <select
              name="destinationId"
              value={formData.destinationId || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Destination</option>
              {destinations.map(dest => (
                <option key={dest._id} value={dest._id}>{dest.name}, {dest.country}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Room Types */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Room Types</h3>
          <div className="space-y-4">
            {formData.roomTypes?.map((room, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{room.name} - ${room.price}</span>
                  <button
                    type="button"
                    onClick={() => removeRoomType(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <p className="text-sm text-gray-600">Facilities: {room.facilities.join(', ')}</p>
              </div>
            ))}
            
            <div className="border border-gray-300 rounded-md p-4">
              <h4 className="font-medium mb-3">Add New Room Type</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <input
                  type="text"
                  placeholder="Room Name"
                  value={newRoomType.name || ''}
                  onChange={(e) => setNewRoomType(prev => ({ ...prev, name: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newRoomType.price || ''}
                  onChange={(e) => setNewRoomType(prev => ({ ...prev, price: Number(e.target.value) }))}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="mb-3">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add facility"
                    value={newFacility}
                    onChange={(e) => setNewFacility(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={addFacility}
                    className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newRoomType.facilities?.map((facility, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1"
                    >
                      {facility}
                      <button
                        type="button"
                        onClick={() => removeFacility(index)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              
              <button
                type="button"
                onClick={addRoomType}
                className="w-full px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add Room Type
              </button>
            </div>
          </div>
        </div>

        {/* Nearby Attractions */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Nearby Attractions</h3>
          <div className="space-y-2">
            {formData.nearbyAttractions?.map((attraction, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <span>{attraction.name} - {attraction.distance}</span>
                <button
                  type="button"
                  onClick={() => removeAttraction(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Attraction name"
                value={newAttraction.name || ''}
                onChange={(e) => setNewAttraction(prev => ({ ...prev, name: e.target.value }))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Distance"
                value={newAttraction.distance || ''}
                onChange={(e) => setNewAttraction(prev => ({ ...prev, distance: e.target.value }))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={addAttraction}
                className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Photos */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Photos</h3>
          <div className="space-y-2">
            {formData.photos?.map((photo, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <span className="truncate">{photo.url}</span>
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  Remove
                </button>
              </div>
            ))}
            
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="Photo URL"
                value={newPhoto.url || ''}
                onChange={(e) => setNewPhoto(prev => ({ ...prev, url: e.target.value }))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={addPhoto}
                className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {hotel ? 'Update Hotel' : 'Add Hotel'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelForm; 
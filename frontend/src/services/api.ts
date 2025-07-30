import axios from 'axios';
import { Destination, Hotel } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Destination APIs
export const destinationApi = {
  getAll: () => api.get<Destination[]>('/destinations'),
  getById: (id: string) => api.get<Destination>(`/destinations/${id}`),
  create: (destination: Destination) => api.post<Destination>('/destinations', destination),
  update: (id: string, destination: Destination) => api.put<Destination>(`/destinations/${id}`, destination),
  delete: (id: string) => api.delete(`/destinations/${id}`),
};

// Hotel APIs
export const hotelApi = {
  getAll: () => api.get<Hotel[]>('/hotels'),
  getById: (id: string) => api.get<Hotel>(`/hotels/${id}`),
  getByDestination: (destinationId: string) => api.get<Hotel[]>(`/hotels/destination/${destinationId}`),
  create: (hotel: Hotel) => api.post<Hotel>('/hotels', hotel),
  update: (id: string, hotel: Hotel) => api.put<Hotel>(`/hotels/${id}`, hotel),
  delete: (id: string) => api.delete(`/hotels/${id}`),
};

export default api; 
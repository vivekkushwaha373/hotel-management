export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Destination {
  _id?: string;
  name: string;
  country: string;
  description: string;
  coordinates: Coordinates;
  [key: string]: any; // Allow dynamic properties
}

export interface RoomType {
  name: string;
  price: number;
  facilities: string[];
}

export interface NearbyAttraction {
  name: string;
  distance: string;
}

export interface Photo {
  url: string;
}

export interface Hotel {
  _id?: string;
  name: string;
  address: string;
  stars: number;
  rating: number;
  priceFrom: number;
  roomTypes: RoomType[];
  nearbyAttractions: NearbyAttraction[];
  photos: Photo[];
  destinationId: string; // Reference to Destination
  [key: string]: any; // Allow dynamic properties
} 
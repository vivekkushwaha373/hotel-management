import { useState, useEffect } from 'react';
import { Destination, Hotel } from './types';
import { destinationApi, hotelApi } from './services/api';
import DestinationSelector from './components/DestinationSelector';
import HotelCard from './components/HotelCard';
import HotelForm from './components/HotelForm';

function App() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
 
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Load destinations on component mount
  useEffect(() => {
    loadDestinations();
  }, []);

  // Filter hotels when destination changes
  useEffect(() => {
    if (selectedDestination) {
      loadHotelsByDestination(selectedDestination);
    } else {
      setFilteredHotels([]);
    }
  }, [selectedDestination]);

  const loadDestinations = async () => {
    try {
      setLoading(true);
      const response = await destinationApi.getAll();
      setDestinations(response.data);
    } catch (err) {
      setError('Failed to load destinations');
      console.error('Error loading destinations:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadHotelsByDestination = async (destinationId: string) => {
    try {
      setLoading(true);
      const response = await hotelApi.getByDestination(destinationId);
      setFilteredHotels(response.data);
    } catch (err) {
      setError('Failed to load hotels');
      console.error('Error loading hotels:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHotel = () => {
    setEditingHotel(undefined);
    setShowForm(true);
  };

  const handleEditHotel = (hotel: Hotel) => {
    setEditingHotel(hotel);
    setShowForm(true);
  };

  const handleDeleteHotel = async (hotelId: string) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      try {
        await hotelApi.delete(hotelId);
        // Reload hotels for the current destination
        if (selectedDestination) {
          loadHotelsByDestination(selectedDestination);
        }
      } catch (err) {
        setError('Failed to delete hotel');
        console.error('Error deleting hotel:', err);
      }
    }
  };

  const handleSubmitHotel = async (hotelData: Hotel) => {
    try {
      if (editingHotel) {
        await hotelApi.update(editingHotel._id!, hotelData);
      } else {
        await hotelApi.create(hotelData);
      }
      setShowForm(false);
      setEditingHotel(undefined);
      // Reload hotels for the current destination
      if (selectedDestination) {
        loadHotelsByDestination(selectedDestination);
      }
    } catch (err) {
      setError('Failed to save hotel');
      console.error('Error saving hotel:', err);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingHotel(undefined);
  };

  if (loading && destinations.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Hotel & Destination Manager</h1>
          <p className="text-gray-600">Manage hotels and destinations with ease</p>
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
            <button
              onClick={() => setError('')}
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          {/* Destination Selector */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <DestinationSelector
              destinations={destinations}
              selectedDestination={selectedDestination}
              onDestinationChange={setSelectedDestination}
            />
          </div>

          {/* Hotel Management */}
          {selectedDestination && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Hotels in {destinations.find(d => d._id === selectedDestination)?.name}
                </h2>
                <button
                  onClick={handleAddHotel}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Add New Hotel
                </button>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading hotels...</p>
                </div>
              ) : filteredHotels.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No hotels found for this destination.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredHotels.map((hotel) => (
                    <HotelCard
                      key={hotel._id}
                      hotel={hotel}
                      onEdit={handleEditHotel}
                      onDelete={handleDeleteHotel}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Hotel Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <HotelForm
                  hotel={editingHotel}
                  destinations={destinations}
                  onSubmit={handleSubmitHotel}
                  onCancel={handleCancelForm}
                />
              </div>
            </div>
          )}

          {/* No Destination Selected */}
          {!selectedDestination && (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome!</h3>
              <p className="text-gray-600">
                Please select a destination from the dropdown above to view and manage hotels.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App; 
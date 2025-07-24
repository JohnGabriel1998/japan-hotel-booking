import React, { useState, useMemo, useEffect } from 'react';
import { Heart, Receipt, MagnifyingGlass, House, Translate } from '@phosphor-icons/react';
import { SearchBar } from './components/SearchBa
import { HotelDetails } from './components/HotelD
import { SearchBar } from './components/SearchBar';
import { HotelCard } from './components/HotelCard';
import { HotelDetails } from './components/HotelDetails';
import { BookingModal } from './components/BookingModal';
import { FavoritesPage } from './components/FavoritesPage';
import { BookingsPage } from './components/BookingsPage';
  const [currentPage, setCurrentPage] = use
import { mockReviews } from './data/reviews';
import { Hotel, Room, SearchFilters, Review } from './types/hotel';
import { useKV } from '@github/spark/hooks';
    checkIn: '',

    amenities: []


  useEffect(() => {
      setReviews(mockReviews);
  }, [reviews, setReviews]);
  const filteredHotels = useMemo(() => {
    
      if (searchFilters.location && !hotel.location.toLowerC
  
      if (searchFilters.guests > 0) {
        if (!hasC
    checkIn: '',
      if (hotelMi
      }
      return true;
    amenities: []
  });

  const [reviews, setReviews] = useKV<Review[]>('hotel-reviews', []);

  // Initialize with mock reviews if none exist
  useEffect(() => {
    if (reviews && reviews.length === 0) {
      setReviews(mockReviews);
    }
  }, [reviews, setReviews]);

  const filteredHotels = useMemo(() => {
    if (!searchFilters) return mockHotels;
    
    return mockHotels.filter(hotel => {
      if (searchFilters.location && !hotel.location.toLowerCase().includes(searchFilters.location.toLowerCase())) {
        return false;
      }
      
      if (searchFilters.guests > 0) {
        const hasCapacity = hotel.rooms.some(room => room.capacity >= searchFilters.guests);
        if (!hasCapacity) return false;
      }
      
      const hotelMinPrice = hotel.priceRange.min;
      if (hotelMinPrice < searchFilters.priceRange[0] || hotelMinPrice > searchFilters.priceRange[1]) {
        return false;
      }
      
      return true;
    });
                </h2>

              </div>

              <div classNam
    

              </div>
              <div className
                  <HotelCar
    

              </div>
          </div>
    }

    <div className="min-h-s
    

              <div className="w-8 h-
              </div>
            </div>
            <nav className
    

                    va
                    className="flex items-center gap
                    <Icon size={18} />
                  </Button>
    

                onClick={toggle
                title={t('
                <Transl
                  {currentLanguage === 'en' ? t('japanese') : t('
              </Button
          </div>
      </header
      {/* Main C
        {renderContent()}

      <HotelDetails
        isOpen={isDetailsOpen}
        onBookRoom=

        hotel={selectedHotel}
        isOpen={is
        checkIn={s


    </div>
}
export default App;











                </h2>
                <span className="text-muted-foreground">
                  {filteredHotels.length} {filteredHotels.length !== 1 ? t('hotelsFound') : t('hotelFound')}
                </span>
              </div>
            </div>

            {filteredHotels.length === 0 ? (
              <div className="text-center py-12">
                <MagnifyingGlass size={64} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t('noHotelsTitle')}</h3>
                <p className="text-muted-foreground">
                  {t('noHotelsSubtitle')}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHotels.map((hotel) => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">J</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">{t('appName')}</h1>
            </div>

            <nav className="flex items-center gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? 'default' : 'ghost'}
                    onClick={() => setCurrentPage(item.id as Page)}
                    className="flex items-center gap-2"
                  >
                    <Icon size={18} />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                );
              })}
              
              <Button
                variant="ghost"
                onClick={toggleLanguage}
                className="flex items-center gap-2 ml-2"
                title={t('language')}
              >
                <Translate size={18} />
                <span className="hidden sm:inline">
                  {currentLanguage === 'en' ? t('japanese') : t('english')}
                </span>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-8">
        {renderContent()}
      </main>

      {/* Dialogs */}
      <HotelDetails
        hotel={selectedHotel}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onBookRoom={handleBookRoom}
      />

      <BookingModal
        hotel={selectedHotel}
        room={selectedRoom}
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        checkIn={searchFilters?.checkIn || ''}
        checkOut={searchFilters?.checkOut || ''}
        guests={searchFilters?.guests || 2}
      />

      <Toaster />
    </div>
  );
}

export default App;
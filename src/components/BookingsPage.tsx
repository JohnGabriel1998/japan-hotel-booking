import React from 'react';
import { CalendarDots, MapPin, Users, Receipt, CheckCircle } from '@phosphor-icons/react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useKV } from '@github/spark/hooks';
import { Booking } from '../types/hotel';
import { useTranslation } from '../hooks/useTranslation';

export function BookingsPage() {
  const { t } = useTranslation();
  const [bookings] = useKV<Booking[]>('user-bookings', []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <Receipt size={64} className="text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">{t('noBookingsTitle')}</h2>
          <p className="text-muted-foreground mb-8">
            {t('noBookingsSubtitle')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('yourBookings')}</h1>
        <p className="text-muted-foreground">
          {bookings.length} {bookings.length > 1 ? t('bookingsFound') : t('bookingFound')}
        </p>
      </div>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <Card key={booking.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{booking.hotelName}</h3>
                  <p className="text-muted-foreground">{booking.roomName}</p>
                </div>
                <Badge className={`${getStatusColor(booking.status)} border-0`}>
                  <CheckCircle size={14} className="mr-1" />
                  {booking.status === 'confirmed' ? t('bookingConfirmed') : booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <CalendarDots size={20} className="text-muted-foreground mt-1" />
                  <div>
                    <div className="font-medium text-sm">{t('checkIn')}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(booking.checkIn)}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CalendarDots size={20} className="text-muted-foreground mt-1" />
                  <div>
                    <div className="font-medium text-sm">{t('checkOut')}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(booking.checkOut)}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users size={20} className="text-muted-foreground mt-1" />
                  <div>
                    <div className="font-medium text-sm">{t('guests')}</div>
                    <div className="text-sm text-muted-foreground">
                      {booking.guests} {t('guests')}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Receipt size={20} className="text-muted-foreground mt-1" />
                  <div>
                    <div className="font-medium text-sm">{t('totalPaid')}</div>
                    <div className="text-lg font-bold text-primary">
                      {formatPrice(booking.totalPrice)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-medium mb-1">Guest Details</h4>
                    <p className="text-sm text-muted-foreground">
                      {booking.guestDetails.firstName} {booking.guestDetails.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {booking.guestDetails.email}
                    </p>
                    {booking.guestDetails.phone && (
                      <p className="text-sm text-muted-foreground">
                        {booking.guestDetails.phone}
                      </p>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      Booking ID: {booking.id}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Booked on {new Date(booking.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
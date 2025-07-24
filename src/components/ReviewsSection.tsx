import React, { useState, useMemo } from 'react';
import { Star, Plus, SortAscending, Filter } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ReviewCard } from './ReviewCard';
import { ReviewForm } from './ReviewForm';
import { Hotel, Review } from '../types/hotel';
import { useKV } from '@github/spark/hooks';

interface ReviewsSectionProps {
  hotel: Hotel;
}

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful';
type FilterOption = 'all' | '5' | '4' | '3' | '2' | '1';

export function ReviewsSection({ hotel }: ReviewsSectionProps) {
  const [reviews, setReviews] = useKV<Review[]>('hotel-reviews', []);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  // Filter reviews for this hotel
  const hotelReviews = reviews.filter(review => review.hotelId === hotel.id);

  // Calculate statistics
  const statistics = useMemo(() => {
    if (hotelReviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        categoryAverages: {
          cleanliness: 0,
          service: 0,
          location: 0,
          value: 0,
          amenities: 0
        }
      };
    }

    const totalRating = hotelReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / hotelReviews.length;

    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    hotelReviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });

    const categoryTotals = {
      cleanliness: 0,
      service: 0,
      location: 0,
      value: 0,
      amenities: 0
    };

    hotelReviews.forEach(review => {
      Object.entries(review.categories).forEach(([category, rating]) => {
        categoryTotals[category as keyof typeof categoryTotals] += rating;
      });
    });

    const categoryAverages = Object.fromEntries(
      Object.entries(categoryTotals).map(([category, total]) => [
        category,
        total / hotelReviews.length
      ])
    ) as typeof categoryTotals;

    return {
      averageRating,
      totalReviews: hotelReviews.length,
      distribution,
      categoryAverages
    };
  }, [hotelReviews]);

  // Sort and filter reviews
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = [...hotelReviews];

    // Apply filter
    if (filterBy !== 'all') {
      const rating = parseInt(filterBy);
      filtered = filtered.filter(review => review.rating === rating);
    }

    // Apply sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        case 'helpful':
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

    return filtered;
  }, [hotelReviews, sortBy, filterBy]);

  const handleHelpful = (reviewId: string) => {
    setReviews(currentReviews => 
      currentReviews.map(review => 
        review.id === reviewId 
          ? { ...review, helpful: review.helpful + 1 }
          : review
      )
    );
  };

  const RatingBar = ({ rating, count, total }: { rating: number; count: number; total: number }) => (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1 w-12">
        <span className="text-sm">{rating}</span>
        <Star size={14} weight="fill" className="text-accent" />
      </div>
      <div className="flex-1 bg-muted rounded-full h-2">
        <div 
          className="bg-accent rounded-full h-2 transition-all duration-300"
          style={{ width: total > 0 ? `${(count / total) * 100}%` : '0%' }}
        />
      </div>
      <span className="text-sm text-muted-foreground w-8">{count}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Guest Reviews</h2>
        <Button onClick={() => setIsReviewFormOpen(true)}>
          <Plus size={18} className="mr-2" />
          Write Review
        </Button>
      </div>

      {/* Review Statistics */}
      {statistics.totalReviews > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 bg-card rounded-lg border">
          {/* Overall Rating */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground">
                  {statistics.averageRating.toFixed(1)}
                </div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      weight={i < Math.round(statistics.averageRating) ? 'fill' : 'regular'}
                      className={i < Math.round(statistics.averageRating) ? 'text-accent' : 'text-muted-foreground'}
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {statistics.totalReviews} review{statistics.totalReviews !== 1 ? 's' : ''}
                </div>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(rating => (
                <RatingBar
                  key={rating}
                  rating={rating}
                  count={statistics.distribution[rating as keyof typeof statistics.distribution]}
                  total={statistics.totalReviews}
                />
              ))}
            </div>
          </div>

          {/* Category Averages */}
          <div>
            <h3 className="font-semibold mb-4">Category Ratings</h3>
            <div className="space-y-3">
              {Object.entries(statistics.categoryAverages).map(([category, average]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{category}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star size={14} weight="fill" className="text-accent" />
                      <span className="text-sm font-medium">{average.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sort and Filter Controls */}
      {statistics.totalReviews > 0 && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <SortAscending size={18} className="text-muted-foreground" />
              <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="highest">Highest Rated</SelectItem>
                  <SelectItem value="lowest">Lowest Rated</SelectItem>
                  <SelectItem value="helpful">Most Helpful</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Filter size={18} className="text-muted-foreground" />
              <Select value={filterBy} onValueChange={(value: FilterOption) => setFilterBy(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredAndSortedReviews.length} of {statistics.totalReviews} reviews
          </div>
        </div>
      )}

      {/* Reviews List */}
      {filteredAndSortedReviews.length > 0 ? (
        <div className="space-y-4">
          {filteredAndSortedReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onHelpful={handleHelpful}
            />
          ))}
        </div>
      ) : statistics.totalReviews > 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No reviews match your current filters.</p>
        </div>
      ) : (
        <div className="text-center py-12">
          <Star size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
          <p className="text-muted-foreground mb-4">
            Be the first to share your experience at this hotel!
          </p>
          <Button onClick={() => setIsReviewFormOpen(true)}>
            Write the First Review
          </Button>
        </div>
      )}

      {/* Review Form Modal */}
      <ReviewForm
        hotel={hotel}
        isOpen={isReviewFormOpen}
        onClose={() => setIsReviewFormOpen(false)}
        onReviewSubmitted={() => {
          // Reviews are automatically updated via useKV hook
        }}
      />
    </div>
  );
}
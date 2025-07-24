import React from 'react';
import { Star, ThumbsUp } from '@phosphor-icons/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Review } from '../types/hotel';

interface ReviewCardProps {
  review: Review;
  onHelpful?: (reviewId: string) => void;
}

export function ReviewCard({ review, onHelpful }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      cleanliness: 'Cleanliness',
      service: 'Service',
      location: 'Location',
      value: 'Value',
      amenities: 'Amenities'
    };
    return labels[category] || category;
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              {review.userAvatar ? (
                <img 
                  src={review.userAvatar} 
                  alt={review.userName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <span className="text-primary font-semibold">
                  {review.userName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <div className="font-semibold text-foreground">{review.userName}</div>
              <div className="text-sm text-muted-foreground">
                Stayed {formatDate(review.stayDate)}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  weight={i < review.rating ? 'fill' : 'regular'}
                  className={i < review.rating ? 'text-accent' : 'text-muted-foreground'}
                />
              ))}
              <span className="ml-1 text-sm font-medium">{review.rating}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {formatDate(review.createdAt)}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
          <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
          {review.roomType && (
            <div className="mt-2">
              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                {review.roomType}
              </span>
            </div>
          )}
        </div>

        {/* Category Ratings */}
        <div className="mb-4 border-t pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {Object.entries(review.categories).map(([category, rating]) => (
              <div key={category} className="text-center">
                <div className="text-xs text-muted-foreground mb-1">
                  {getCategoryLabel(category)}
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Star
                    size={12}
                    weight="fill"
                    className="text-accent"
                  />
                  <span className="text-sm font-medium">{rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Helpful Button */}
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-sm text-muted-foreground">
            Was this review helpful?
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onHelpful?.(review.id)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ThumbsUp size={16} />
            <span>Helpful ({review.helpful})</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
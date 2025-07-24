import React, { useState } from 'react';
import { Star, X } from '@phosphor-icons/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Review, Hotel } from '../types/hotel';
import { useKV } from '@github/spark/hooks';
import { toast } from 'sonner';

interface ReviewFormProps {
  hotel: Hotel | null;
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted?: () => void;
}

export function ReviewForm({ hotel, isOpen, onClose, onReviewSubmitted }: ReviewFormProps) {
  const [reviews, setReviews] = useKV<Review[]>('hotel-reviews', []);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [roomType, setRoomType] = useState('');
  const [stayDate, setStayDate] = useState('');
  const [categories, setCategories] = useState({
    cleanliness: 0,
    service: 0,
    location: 0,
    value: 0,
    amenities: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCategoryRating = (category: string, value: number) => {
    setCategories(prev => ({ ...prev, [category]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hotel || rating === 0 || !title.trim() || !comment.trim() || !stayDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Check if all category ratings are provided
    const hasAllCategoryRatings = Object.values(categories).every(rating => rating > 0);
    if (!hasAllCategoryRatings) {
      toast.error('Please rate all categories');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get current user info
      const user = await spark.user();
      
      const newReview: Review = {
        id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        hotelId: hotel.id,
        userId: user.id,
        userName: user.login || 'Guest User',
        userAvatar: user.avatarUrl,
        rating,
        title: title.trim(),
        comment: comment.trim(),
        roomType: roomType.trim() || undefined,
        stayDate,
        createdAt: new Date().toISOString(),
        helpful: 0,
        categories
      };

      setReviews(currentReviews => [newReview, ...currentReviews]);
      
      toast.success('Review submitted successfully!');
      
      // Reset form
      setRating(0);
      setTitle('');
      setComment('');
      setRoomType('');
      setStayDate('');
      setCategories({
        cleanliness: 0,
        service: 0,
        location: 0,
        value: 0,
        amenities: 0
      });
      
      onReviewSubmitted?.();
      onClose();
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ 
    value, 
    onChange, 
    hover, 
    onHover, 
    onLeave, 
    size = 24 
  }: {
    value: number;
    onChange: (rating: number) => void;
    hover?: number;
    onHover?: (rating: number) => void;
    onLeave?: () => void;
    size?: number;
  }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => onHover?.(star)}
          onMouseLeave={onLeave}
          className="transition-colors hover:scale-110"
        >
          <Star
            size={size}
            weight={(hover || value) >= star ? 'fill' : 'regular'}
            className={(hover || value) >= star ? 'text-accent' : 'text-muted-foreground'}
          />
        </button>
      ))}
    </div>
  );

  if (!hotel) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Write a Review for {hotel.name}</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X size={20} />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Overall Rating */}
          <div>
            <Label className="text-base font-semibold">Overall Rating *</Label>
            <div className="flex items-center gap-3 mt-2">
              <StarRating
                value={rating}
                onChange={setRating}
                hover={hoverRating}
                onHover={setHoverRating}
                onLeave={() => setHoverRating(0)}
                size={32}
              />
              <span className="text-sm text-muted-foreground">
                {rating > 0 && `${rating} star${rating !== 1 ? 's' : ''}`}
              </span>
            </div>
          </div>

          {/* Category Ratings */}
          <Card>
            <CardContent className="p-4">
              <Label className="text-base font-semibold mb-4 block">Rate Your Experience *</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(categories).map(([category, value]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-sm capitalize">{category}</span>
                    <StarRating
                      value={value}
                      onChange={(rating) => handleCategoryRating(category, rating)}
                      size={20}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Review Title */}
          <div>
            <Label htmlFor="review-title" className="text-base font-semibold">
              Review Title *
            </Label>
            <Input
              id="review-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience in a few words"
              className="mt-2"
              maxLength={100}
            />
            <div className="text-xs text-muted-foreground mt-1">
              {title.length}/100 characters
            </div>
          </div>

          {/* Review Comment */}
          <div>
            <Label htmlFor="review-comment" className="text-base font-semibold">
              Your Review *
            </Label>
            <Textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell other travelers about your experience at this hotel..."
              className="mt-2 min-h-[120px]"
              maxLength={1000}
            />
            <div className="text-xs text-muted-foreground mt-1">
              {comment.length}/1000 characters
            </div>
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="room-type">Room Type</Label>
              <Input
                id="room-type"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                placeholder="e.g., Deluxe Double Room"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="stay-date">Stay Date *</Label>
              <Input
                id="stay-date"
                type="date"
                value={stayDate}
                onChange={(e) => setStayDate(e.target.value)}
                className="mt-2"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || rating === 0}
              className="min-w-[120px]"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
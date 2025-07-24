import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ReviewPhoto } from '../types/hotel';

interface PhotoGalleryProps {
  photos: ReviewPhoto[];
  className?: string;
}

export function PhotoGallery({ photos, className = '' }: PhotoGalleryProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  if (!photos || photos.length === 0) {
    return null;
  }

  const openPhoto = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closePhoto = () => {
    setSelectedPhotoIndex(null);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (selectedPhotoIndex === null) return;

    if (direction === 'prev') {
      setSelectedPhotoIndex(selectedPhotoIndex > 0 ? selectedPhotoIndex - 1 : photos.length - 1);
    } else {
      setSelectedPhotoIndex(selectedPhotoIndex < photos.length - 1 ? selectedPhotoIndex + 1 : 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      navigatePhoto('prev');
    } else if (e.key === 'ArrowRight') {
      navigatePhoto('next');
    } else if (e.key === 'Escape') {
      closePhoto();
    }
  };

  // Display layout based on number of photos
  const renderPhotoGrid = () => {
    if (photos.length === 1) {
      return (
        <div className="relative">
          <img
            src={photos[0].url}
            alt={photos[0].caption || 'Review photo'}
            className="w-full h-48 sm:h-60 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openPhoto(0)}
          />
          {photos[0].caption && (
            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {photos[0].caption}
            </div>
          )}
        </div>
      );
    }

    if (photos.length === 2) {
      return (
        <div className="grid grid-cols-2 gap-2">
          {photos.map((photo, index) => (
            <div key={photo.id} className="relative">
              <img
                src={photo.url}
                alt={photo.caption || 'Review photo'}
                className="w-full h-32 sm:h-40 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openPhoto(index)}
              />
              {photo.caption && (
                <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                  {photo.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (photos.length === 3) {
      return (
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <img
              src={photos[0].url}
              alt={photos[0].caption || 'Review photo'}
              className="w-full h-40 sm:h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openPhoto(0)}
            />
            {photos[0].caption && (
              <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                {photos[0].caption}
              </div>
            )}
          </div>
          <div className="grid grid-rows-2 gap-2">
            {photos.slice(1, 3).map((photo, index) => (
              <div key={photo.id} className="relative">
                <img
                  src={photo.url}
                  alt={photo.caption || 'Review photo'}
                  className="w-full h-[4.75rem] sm:h-[5.75rem] object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openPhoto(index + 1)}
                />
                {photo.caption && (
                  <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                    {photo.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 4+ photos
    return (
      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <img
            src={photos[0].url}
            alt={photos[0].caption || 'Review photo'}
            className="w-full h-40 sm:h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openPhoto(0)}
          />
          {photos[0].caption && (
            <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
              {photos[0].caption}
            </div>
          )}
        </div>
        <div className="grid grid-rows-2 gap-2">
          {photos.slice(1, 3).map((photo, index) => (
            <div key={photo.id} className="relative">
              <img
                src={photo.url}
                alt={photo.caption || 'Review photo'}
                className="w-full h-[4.75rem] sm:h-[5.75rem] object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openPhoto(index + 1)}
              />
              {photo.caption && (
                <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                  {photo.caption}
                </div>
              )}
            </div>
          ))}
          {photos.length > 3 && (
            <div 
              className="relative cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openPhoto(3)}
            >
              <img
                src={photos[3].url}
                alt={photos[3].caption || 'Review photo'}
                className="w-full h-[4.75rem] sm:h-[5.75rem] object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  +{photos.length - 3}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={className}>
        {renderPhotoGrid()}
      </div>

      {/* Photo Lightbox */}
      <Dialog open={selectedPhotoIndex !== null} onOpenChange={closePhoto}>
        <DialogContent 
          className="max-w-4xl w-full h-[90vh] p-0 bg-black/95"
          onKeyDown={handleKeyDown}
        >
          {selectedPhotoIndex !== null && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={closePhoto}
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              >
                <X size={24} />
              </Button>

              {/* Navigation Buttons */}
              {photos.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigatePhoto('prev')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  >
                    <ArrowLeft size={24} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigatePhoto('next')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  >
                    <ArrowRight size={24} />
                  </Button>
                </>
              )}

              {/* Photo */}
              <img
                src={photos[selectedPhotoIndex].url}
                alt={photos[selectedPhotoIndex].caption || 'Review photo'}
                className="max-w-full max-h-full object-contain"
              />

              {/* Photo Info */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                {photos[selectedPhotoIndex].caption && (
                  <p className="text-white bg-black/50 px-3 py-2 rounded-lg mb-2">
                    {photos[selectedPhotoIndex].caption}
                  </p>
                )}
                {photos.length > 1 && (
                  <p className="text-white/70 text-sm">
                    {selectedPhotoIndex + 1} of {photos.length}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
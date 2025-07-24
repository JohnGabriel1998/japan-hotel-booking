import React, { useState, useRef } from 'react';
import { Camera, X, Plus, Image as ImageIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ReviewPhoto } from '../types/hotel';
import { toast } from 'sonner';

interface PhotoUploadProps {
  photos: ReviewPhoto[];
  onPhotosChange: (photos: ReviewPhoto[]) => void;
  maxPhotos?: number;
  className?: string;
}

export function PhotoUpload({ 
  photos, 
  onPhotosChange, 
  maxPhotos = 5,
  className = ''
}: PhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length === 0) return;
    
    if (photos.length + files.length > maxPhotos) {
      toast.error(`You can upload a maximum of ${maxPhotos} photos`);
      return;
    }

    setIsUploading(true);

    try {
      const newPhotos: ReviewPhoto[] = [];

      for (const file of files) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast.error(`${file.name} is not a valid image file`);
          continue;
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large. Maximum size is 5MB`);
          continue;
        }

        // Convert to base64 for storage
        const base64 = await fileToBase64(file);
        
        const photo: ReviewPhoto = {
          id: `photo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          url: base64,
          uploadedAt: new Date().toISOString()
        };

        newPhotos.push(photo);
      }

      if (newPhotos.length > 0) {
        onPhotosChange([...photos, ...newPhotos]);
        toast.success(`${newPhotos.length} photo(s) uploaded successfully`);
      }
    } catch (error) {
      toast.error('Failed to upload photos. Please try again.');
    } finally {
      setIsUploading(false);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleRemovePhoto = (photoId: string) => {
    onPhotosChange(photos.filter(photo => photo.id !== photoId));
    toast.success('Photo removed');
  };

  const handleUpdateCaption = (photoId: string, caption: string) => {
    onPhotosChange(
      photos.map(photo => 
        photo.id === photoId 
          ? { ...photo, caption: caption.trim() || undefined }
          : photo
      )
    );
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold">Add Photos</h3>
          <p className="text-sm text-muted-foreground">
            Share photos of your stay to help other travelers ({photos.length}/{maxPhotos})
          </p>
        </div>
        
        {photos.length < maxPhotos && (
          <Button
            type="button"
            variant="outline"
            onClick={triggerFileInput}
            disabled={isUploading}
            className="flex items-center gap-2"
          >
            <Camera size={18} />
            {isUploading ? 'Uploading...' : 'Add Photos'}
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {photos.length === 0 ? (
        <Card className="border-2 border-dashed border-muted hover:border-primary/50 transition-colors">
          <CardContent className="p-8">
            <div className="text-center">
              <ImageIcon size={48} className="text-muted-foreground mx-auto mb-4" />
              <h4 className="font-medium mb-2">No photos added yet</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Add photos to showcase your experience
              </p>
              <Button 
                type="button"
                variant="secondary" 
                onClick={triggerFileInput}
                disabled={isUploading}
                className="flex items-center gap-2"
              >
                <Plus size={18} />
                {isUploading ? 'Uploading...' : 'Upload Photos'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={photo.url}
                  alt={photo.caption || 'Review photo'}
                  className="w-full h-48 object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemovePhoto(photo.id)}
                  className="absolute top-2 right-2 w-8 h-8 p-0"
                >
                  <X size={16} />
                </Button>
              </div>
              <CardContent className="p-3">
                <Input
                  placeholder="Add a caption (optional)"
                  value={photo.caption || ''}
                  onChange={(e) => handleUpdateCaption(photo.id, e.target.value)}
                  className="text-sm"
                  maxLength={100}
                />
              </CardContent>
            </Card>
          ))}
          
          {photos.length < maxPhotos && (
            <Card className="border-2 border-dashed border-muted hover:border-primary/50 transition-colors">
              <CardContent className="p-4 h-48 flex items-center justify-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={triggerFileInput}
                  disabled={isUploading}
                  className="flex flex-col items-center gap-2 h-full w-full"
                >
                  <Plus size={32} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {isUploading ? 'Uploading...' : 'Add More'}
                  </span>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {photos.length > 0 && (
        <div className="mt-3 text-xs text-muted-foreground">
          Maximum file size: 5MB per photo. Supported formats: JPG, PNG, GIF, WebP
        </div>
      )}
    </div>
  );
}
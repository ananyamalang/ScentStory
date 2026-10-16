import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  className?: string;
  fallbackClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackTitle,
  className = '',
  fallbackClassName = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#291F1C]/5 to-[#54212D]/10 text-[#291F1C] border border-[#D8CBBE]/40 ${fallbackClassName || className}`}
      >
        <div className="w-12 h-12 rounded-full border border-[#C7A778]/50 flex items-center justify-center mb-3 bg-[#F6F1E9]/80">
          <Sparkles className="w-5 h-5 text-[#C7A778]" />
        </div>
        <p className="font-serif text-lg tracking-wide text-[#291F1C]">{fallbackTitle || alt || 'ScentStory Flacon'}</p>
        <p className="text-xs tracking-widest uppercase text-[#54212D] mt-1 font-medium">Eau de Parfum</p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#EFE9DF] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt || 'ScentStory Perfume'}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};

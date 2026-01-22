"use client"

import React from 'react';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';

interface StarRatingProps {
  rating: number;
  count?: number;
}

const StarRating = ({ rating, count }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-1">
      <div className="flex text-[#FF9900]">
        {[...Array(5)].map((_, i) => (
          i < fullStars ? (
            <StarSolid key={i} className="h-4 w-4" />
          ) : (
            <StarOutline key={i} className="h-4 w-4" />
          )
        ))}
      </div>
      {count !== undefined && (
        <span className="text-xs text-[#007185] hover:text-[#C45500] cursor-pointer ml-1 font-medium">
          ({count})
        </span>
      )}
    </div>
  );
};

export default StarRating;

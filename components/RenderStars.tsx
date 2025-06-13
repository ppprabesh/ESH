import React from 'react';

export function renderStars(rating: number) {
  return (
    <span>
      {Array.from({ length: rating }).map((_, i) => (
        <span key={i}>⭐</span>
      ))}
    </span>
  );
}
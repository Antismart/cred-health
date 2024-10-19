import React from 'react';

export function Image({ src, alt, className, width, height, ...props }) {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      style={{ width, height, objectFit: 'cover' }}
      {...props}
    />
  );
}
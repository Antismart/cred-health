import React from 'react';

export function Button({ children, className, variant, ...props }) {
  const baseStyle = "px-4 py-2 rounded";
  const variantStyles = {
    default: "bg-purple-600 text-white hover:bg-purple-700",
    outline: "border border-purple-600 text-purple-600 hover:bg-purple-100"
  };
  
  return (
    <button className={`${baseStyle} ${variantStyles[variant || 'default']} ${className}`} {...props}>
      {children}
    </button>
  );
}
import React from 'react';
// import backgroundImage from '../assets/Landing.png';

interface LayoutProps {
  children: React.ReactNode;
  fullBackground?: boolean;
  noOverlay?: boolean;
}

export default function Layout({ children, fullBackground = false, noOverlay = false }: LayoutProps) {
  const baseStyle: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    margin: 0,
    backgroundImage: `url('../assets/Landing.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(107, 70, 193, 0.7)',
    display: noOverlay ? 'none' : 'block',
  };

  const contentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 1,
    padding: fullBackground ? '0' : '20px',
    flex: 1,
  };

  return (
    <div style={baseStyle}>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
}

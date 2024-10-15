import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '/assets/Landing.png';

const Button = ({ children, primary, to, withAnimation }) => (
  <div style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
    <Link
      to={to}
      style={{
        padding: '12px 24px',
        borderRadius: '50px',
        fontWeight: 'bold',
        cursor: 'pointer',
        backgroundColor: primary ? 'white' : 'transparent',
        color: primary ? '#6B46C1' : 'white',
        border: primary ? 'none' : '2px solid white',
        marginRight: '16px',
        fontSize: '1.1rem',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        display: 'inline-block',
        animation: withAnimation ? 'pulse 2s infinite' : 'none',
      }}
    >
      {children}
    </Link>
    {withAnimation && <AnimatedArrow />}
  </div>
);

const AnimatedArrow = () => (
  <div style={{
    position: 'absolute',
    top: '-40px',
    left: '50%',
    transform: 'translateX(-50%)',
    animation: 'bounce 1s infinite',
    color: 'yellow',
    fontSize: '24px',
  }}>
    ↓
  </div>
);

const MottoBlock = ({ children, position }) => {
  const getPosition = () => {
    if (position === 'left') {
      return {
        left: `${Math.random() * 5 + 2}%`,
        top: `${Math.random() * 80}%`,
      };
    } else {
      return {
        right: `${Math.random() * 20}%`,
        top: `${Math.random() * 80}%`,
      };
    }
  };

  const animationDuration = 15 + Math.random() * 10; // Random duration between 15-25s

  return (
    <div style={{
      position: 'absolute',
      ...getPosition(),
      color: '#FFFF00', // Bright yellow color
      fontSize: '1rem',
      fontWeight: 'bold',
      textAlign: 'left',
      maxWidth: '200px',
      padding: '10px',
      animation: `float ${animationDuration}s ease-in-out infinite`,
      textShadow: '2px 2px 4px rgba(0,0,0,0.7)', // Shadow for better readability
      zIndex: 2,
    }}>
      {children}
    </div>
  );
};

function LandingPage() {
  const mottos = [
    "Empowering Communities for Better Health",
    "Blockchain Technology for Transparent Healthcare",
    "Breaking Borders in Medical Funding",
    "United Global Network for Local Health Impact",
    "Revolutionizing Healthcare Through Crowdfunding",
    "Secure and Borderless Health Initiatives",
    "Transforming Lives with Community Support",
    "One Community Village for Social Impact!",
    ""
  ];

  return (
    <div style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top', // Changed to 'center top'
        backgroundRepeat: 'no-repeat',
        minHeight: 'calc(100vh - 4px)', // Adjust 64px to match your exact navbar height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 16px 32px', // Removed top padding, kept bottom and side padding
        position: 'relative',
        overflow: 'hidden',
    }}>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(10px, -15px) scale(1.05); }
            50% { transform: translate(-5px, 10px) scale(0.95); }
            75% { transform: translate(-15px, -5px) scale(1.02); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0) translateX(-50%); }
            50% { transform: translateY(-10px) translateX(-50%); }
          }
        `}
      </style>

      {/* Purple Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(107, 70, 193, 0.7)',
      }}></div>

      {/* Animated Motto Blocks */}
      {mottos.map((motto, index) => (
        <MottoBlock key={index} position={index % 2 === 0 ? 'left' : 'right'}>
          {motto}
        </MottoBlock>
      ))}

      {/* Main Content */}
      <div style={{ 
        position: 'relative',
        zIndex: 3,
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        maxWidth: '800px',
      }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: 'bold', 
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        }}>
          CrowdHealth: Touching Lives Through The Power Of Community.
        </h1>
        <p style={{ 
          fontSize: '1.4rem', 
          marginBottom: '48px',
          maxWidth: '600px',
          lineHeight: '1.6',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
        }}>
          Join our platform to raise funds for medical treatments, support healthcare initiatives, and make a difference in people's lives.
        </p>
        <div>
          <Button primary to="/create">Start a Campaign</Button>
          <Button to="/campaigns" withAnimation>Donate Now</Button>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        zIndex: 3,
      }}>
        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>© 2024 CrowdHealth. All rights reserved.</p>
      </div>
    </div>
  );
}

function MobileLandingPage() {
  return (
    <div style={{ 
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '16px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Purple Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(107, 70, 193, 0.7)',
      }}></div>

      {/* Main Content */}
      <div style={{ 
        position: 'relative',
        zIndex: 3,
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        maxWidth: '100%',
        padding: '0 10px',
      }}>
        <h1 style={{ 
          fontSize: '2rem',
          fontWeight: 'bold', 
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        }}>
          CrowdHealth: Touching Lives Through The Power Of Community.
        </h1>
        <p style={{ 
          fontSize: '1rem',
          marginBottom: '30px',
          lineHeight: '1.4',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
        }}>
          Join our platform to raise funds for medical treatments, support healthcare initiatives, and make a difference in people's lives.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Button primary to="/create">Start a Campaign</Button>
          <Button to="/campaigns" withAnimation>Donate Now</Button>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        zIndex: 3,
      }}>
        <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>© 2024 CrowdHealth. All rights reserved.</p>
      </div>
    </div>
  );
}

export default function ResponsiveLandingPage() {
  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .desktop-version { display: none; }
            .mobile-version { display: block; }
          }
          @media (min-width: 769px) {
            .desktop-version { display: block; }
            .mobile-version { display: none; }
          }
        `}
      </style>
      <div className="desktop-version">
        <LandingPage />
      </div>
      <div className="mobile-version">
        <MobileLandingPage />
      </div>
    </>
  );
}
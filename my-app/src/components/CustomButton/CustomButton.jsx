import React from 'react';

const CustomButton = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary', 
  size = 'medium' 
}) => {
  const baseStyle = {
    padding: size === 'small' ? '5px 10px' : '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: size === 'small' ? '14px' : '16px',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  };

  const variantStyles = {
    primary: {
      backgroundColor: '#4CAF50',
      color: 'white',
      '&:hover': { backgroundColor: '#45a049' }
    },
    secondary: {
      backgroundColor: '#f44336',
      color: 'white',
      '&:hover': { backgroundColor: '#d32f2f' }
    },
    default: {
      backgroundColor: '#e0e0e0',
      color: 'black',
      '&:hover': { backgroundColor: '#d5d5d5' }
    }
  };

  return (
    <button
      style={{
        ...baseStyle,
        ...variantStyles[variant],
        opacity: disabled ? 0.6 : 1,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CustomButton;
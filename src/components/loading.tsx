// import React from 'react';

interface LoaderProps {
    message?: string;
    size?: 'small' | 'medium' | 'large';
  }
  
  const Loader: React.FC<LoaderProps> = ({ message = '', size = 'small' }) => {
    const spinnerSize = size === 'small' ? 'w-6 h-6' : size === 'medium' ? 'w-10 h-10' : 'w-16 h-16';
    const borderWidth = size === 'small' ? 'border-2' : size === 'medium' ? 'border-4' : 'border-6';
  
    return (
      <div className="flex items-center justify-center gap-2">
        <div
          className={`rounded-full border-t-4 border-t-blue-500 border-solid border-gray-200 animate-spin ${spinnerSize} ${borderWidth}`}
        ></div>
        {message && (
          <div className={`font-bold ${size === 'small' ? 'text-xs' : 'text-lg'} text-blue-500`}>
            {message}
          </div>
        )}
      </div>
    );
  };
  
  export default Loader;
  
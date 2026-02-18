import React from 'react';
import { useUI } from '../context/UIContext';

const Spinner: React.FC = () => {
  const { loading } = useUI();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
    </div>
  );
};

export default Spinner;
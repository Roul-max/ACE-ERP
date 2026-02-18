import React, { createContext, useContext, useState, useEffect } from 'react';

interface UIContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Listen for custom events dispatched from non-React code (client.ts)
  useEffect(() => {
    const handleLoading = (e: CustomEvent) => setLoading(e.detail);
    const handleError = (e: CustomEvent) => setError(e.detail);

    window.addEventListener('ui-loading', handleLoading as EventListener);
    window.addEventListener('ui-error', handleError as EventListener);

    return () => {
      window.removeEventListener('ui-loading', handleLoading as EventListener);
      window.removeEventListener('ui-error', handleError as EventListener);
    };
  }, []);

  return (
    <UIContext.Provider value={{ loading, setLoading, error, setError }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI must be used within UIProvider');
  return context;
};
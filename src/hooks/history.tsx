import React, { createContext, useCallback, useState, useContext } from 'react';

interface HistoryState {
  pathname: string;
}

interface HistoryContextData {
  pathname: string;
  addPathname(pathname: string): void;
}

const HistoryContext = createContext<HistoryContextData>(
  {} as HistoryContextData,
);

export const HistoryContextProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<HistoryState>(() => {
    const pathname = localStorage.getItem('@FronzaTransportes:pathname');

    if (pathname) {
      return { pathname };
    }

    return {} as HistoryState;
  });

  const addPathname = useCallback(pathname => {
    localStorage.setItem('@FronzaTransportes:pathname', pathname);

    setData({ pathname });
  }, []);

  return (
    <HistoryContext.Provider value={{ pathname: data.pathname, addPathname }}>
      {children}
    </HistoryContext.Provider>
  );
};

export function useHistory(): HistoryContextData {
  const context = useContext(HistoryContext);

  if (!context) {
    throw new Error('useHistory must be used within an HistoryProvider');
  }

  return context;
}

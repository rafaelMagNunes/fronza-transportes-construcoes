import React from 'react';

import { AuthProvider } from './auth';
import { ItenProvider } from './iten';
import { ToastProvider } from './toast';
import { SupplierProvider } from './supplier';
import { HistoryContextProvider } from './history';
import { ConstructionProvider } from './construction';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <HistoryContextProvider>
        <ConstructionProvider>
          <SupplierProvider>
            <ItenProvider>{children}</ItenProvider>
          </SupplierProvider>
        </ConstructionProvider>
      </HistoryContextProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;

import React from 'react';

import { AuthProvider } from './Auth';

const AppProvider: React.FC = ({ children }: any) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppProvider;

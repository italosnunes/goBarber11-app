import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes = () => {
  const signin = true;
  const loading = false;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#660066" />
      </View>
    );
  }
  return signin ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;

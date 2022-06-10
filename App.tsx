import React from 'react';
import { View, StatusBar } from 'react-native';
console.disableYellowBox = true; // tirar os warnings do expo

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';

import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
  return (

      <NavigationContainer>

          <AuthProvider>

              <StatusBar backgroundColor='#1d1d2e' barStyle='light-content' transLucent={false} />

              <Routes />

          </AuthProvider>
          
      </NavigationContainer>

  );
}


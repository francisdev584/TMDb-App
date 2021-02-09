import React from 'react';
import { Image, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import Main from '../pages/Main';
import MovieDetails from '../pages/MovieDetails';

const MainStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#0d253f' },
    }}
  >
    <MainStack.Screen name="SignIn" component={SignIn} />
    <MainStack.Screen name="Main" component={Main} />
    <MainStack.Screen name="MovieDetails" component={MovieDetails} />
  </MainStack.Navigator>
);

export default AuthRoutes;

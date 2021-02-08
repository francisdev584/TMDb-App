import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import Main from '../pages/Main';
import MovieDetails from '../pages/MovieDetails';
import { useAuth } from '../hooks/Auth';

const MainStack = createStackNavigator();

const AuthRoutes: React.FC = () => {
  const { isSignIn } = useAuth();
  return (
    <MainStack.Navigator
      initialRouteName="Main"
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
};
// return isSignIn() ? (
//   <MainStack.Navigator
//     initialRouteName="Main"
//     screenOptions={{
//       headerShown: false,
//       cardStyle: { backgroundColor: '#0d253f' },
//     }}
//   >
//     <MainStack.Screen name="Main" component={Main} />
//     <MainStack.Screen name="MovieDetails" component={MovieDetails} />
//   </MainStack.Navigator>
// ) : (
//   <MainStack.Navigator
//     initialRouteName="SignIn"
//     screenOptions={{
//       headerShown: false,
//       cardStyle: { backgroundColor: '#0d253f' },
//     }}
//   >
//     <MainStack.Screen name="SignIn" component={SignIn} />
//   </MainStack.Navigator>
// );
export default AuthRoutes;

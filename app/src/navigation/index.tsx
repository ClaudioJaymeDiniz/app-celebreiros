import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerNavigator } from '../screens/drawer';
import Register from '../screens/drawer/register';
import Login from '../screens/drawer/login';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

const Stack = createNativeStackNavigator();

function Routes() {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        // Rotas públicas (não autenticadas)
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      ) : (
        // Rotas autenticadas
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
      )}
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
} 
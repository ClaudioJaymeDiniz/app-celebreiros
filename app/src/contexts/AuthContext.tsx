import React, { createContext, useState, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  nome: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  signIn: (token: string, user: User) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  async function signIn(token: string, userData: User) {
    await AsyncStorage.setItem('@Celebreiros:token', token);
    await AsyncStorage.setItem('@Celebreiros:user', JSON.stringify(userData));
    setUser(userData);
  }

  async function signOut() {
    await AsyncStorage.removeItem('@Celebreiros:token');
    await AsyncStorage.removeItem('@Celebreiros:user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
} 
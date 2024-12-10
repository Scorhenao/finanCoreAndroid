import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../hooks/useAuth';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const auth = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('accessToken');
      if (storedToken) {
        setToken(storedToken);
      }
    };
    loadToken();
  }, []);

  useEffect(() => {
    if (auth.token) {
      setToken(auth.token);
    }
  }, [auth.token]);

  return (
    <AuthContext.Provider value={{...auth, token}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

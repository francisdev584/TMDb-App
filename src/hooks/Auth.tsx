/* eslint-disable camelcase */
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface AuthState {
  // eslint-disable-next-line camelcase
  session_id: string;
}

interface SignInCredentials {
  username: string;
  password: string;
  request_token: string;
}

interface AuthContextData {
  user: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  isSignIn: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }: any) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token] = await AsyncStorage.multiGet(['@TMDb:token']);

      if (token[1]) {
        setData({ session_id: token[1] });
        setIsSignIn(true);
      }
    }

    console.log('Auth==> ', data);
    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ username, password, request_token }) => {
    const {
      data: { request_token: reqToken },
    } = await api.post('/authentication/token/validate_with_login', {
      username,
      password,
      request_token,
    });

    console.log('reqToken==> ', reqToken);
    const {
      data: { session_id },
    } = await api.post('/authentication/session/new', {
      request_token: reqToken,
    });
    console.log('session_id==> ', session_id);
    await AsyncStorage.multiSet([['@TMDb:token', session_id]]);

    setData({ session_id });
    setIsSignIn(true);

    setIsSignIn(false);
  }, []);

  const signOut = useCallback(async () => {
    await api.delete('/authentication/session', {
      data: {
        session_id: data.session_id,
      },
    });
    await AsyncStorage.multiRemove(['@TMDb:token']);

    setData({} as AuthState);
    setIsSignIn(false);
  }, [data.session_id]);

  return (
    <AuthContext.Provider
      value={{ user: data.session_id, signIn, signOut, isSignIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };

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
  isSignIn(): boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }: any) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token] = await AsyncStorage.multiGet(['@TMDb:token']);

      if (token[1]) {
        setData({ session_id: token[1] });
      }
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ username, password, request_token }) => {
    try {
      await api.post('/authentication/token/validate_with_login', {
        username,
        password,
        request_token,
      });
      const { session_id: token }: AuthState = await api.post(
        '/authentication/token/new',
        {
          request_token,
        },
      );
      await AsyncStorage.multiSet([['@TMDb:token', token]]);

      setData({ session_id: token });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const signOut = useCallback(async () => {
    await api.delete('/authentication/session', {
      data: {
        session_id: data.session_id,
      },
    });
    await AsyncStorage.multiRemove(['@TMDb:token']);

    setData({} as AuthState);
  }, [data.session_id]);

  const isSignIn = useCallback(() => {
    return Boolean(data.session_id);
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

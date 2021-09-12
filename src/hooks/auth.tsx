import React, { createContext, useContext, useState, useEffect } from "react";
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { RESPONSE_TYPE } = process.env;
const { REDIRECT_URI } = process.env;
const { CDN_IMAGE } = process.env;
const { CLIENT_ID } = process.env;
const { SCOPE } = process.env;

import { api } from '../services/api';
import { COLLECTION_USERS } from '../configs/database';

interface User {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
}

interface AuthContextData {
  //states
  user: User;
  loading: boolean;

  //functions
  signIn: () => Promise<void>;
  singOut: () => Promise<void>;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
  }
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  async function signIn() {
    try {
      setLoading(true);

      //authUrl: link where the user will authenticate (we need to build the authorization url)
      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const {
        params,
        type
      } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

      if (type === "success" && !params.error) {
        //injecting the Bearer type token that I get from the authentication response in the request header
        api.defaults.headers.authorization = `Bearer ${params.access_token}`;

        const userInfo = await api.get('/users/@me');

        const firstName = userInfo.data.username.split(' ')[0];
        userInfo.data.avatar =
          `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

        const userData = {
          ...userInfo.data,
          firstName,
          token: params.access_token
        }

        await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));
        setUser(userData)
      }
    } catch {
      throw new Error('Não foi possível autenticar');
    } finally {
      setLoading(false);
    }
  }

  async function singOut() {
    setUser({} as User);

    await AsyncStorage.removeItem(COLLECTION_USERS);
  }

  async function loadUserStorageData() {
    const storage = await AsyncStorage.getItem(COLLECTION_USERS);

    if (storage) {
      const userLogged = JSON.parse(storage) as User;

      api.defaults.headers.authorization = `Bearer ${userLogged.token}`;

      setUser(userLogged);
    };
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{
      //states
      user,
      loading,

      //functions
      signIn,
      singOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  return context;
}

export { AuthProvider, useAuth };
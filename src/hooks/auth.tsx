import React, { createContext, useContext, useState } from "react";
import * as AuthSession from 'expo-auth-session';

import {
  RESPONSE_TYPE,
  REDIRECT_URI,
  CDN_IMAGE,
  CLIENT_ID,
  SCOPE,
} from '../configs';

import { api } from '../services/api';

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
  signIn: () => Promise<void>
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token: string;
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

      if (type === "success") {
        //injecting the Bearer type token that I get from the authentication response in the request header
        api.defaults.headers.authorization = `Bearer ${params.access_token}`;

        const userInfo = await api.get('/users/@me');

        const firstName = userInfo.data.username.split(' ')[0];
        userInfo.data.avatar =
          `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

        setUser({
          ...userInfo.data,
          firstName,
          token: params.access_token
        })

        setLoading(false);
      } else {
        setLoading(false);
      }

    } catch {
      throw new Error('Não foi possível autenticar');
    }
  }

  return (
    <AuthContext.Provider value={{
      //states
      user,
      loading,

      //functions
      signIn,
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
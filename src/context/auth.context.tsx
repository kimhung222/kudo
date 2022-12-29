import { signInAnonymously } from 'firebase/auth';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { auth } from '../libs/firebase';
import { AuthContext, AuthContextProps } from './auth.provider';
import { Toaster } from 'react-hot-toast';

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthContextProps['user']>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    signInAnonymously(auth)
      .then(credential => {
        setCurrentUser(credential.user);
        setPending(false);
      })
      .catch(error => {
        console.error('useEffect  👻  error', error);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        pending
      }}
    >
      <Toaster />
      {children}
    </AuthContext.Provider>
  );
};

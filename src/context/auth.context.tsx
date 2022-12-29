import { signInAnonymously } from 'firebase/auth';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { auth, onMessageListener } from '../libs/firebase';
import { AuthContext, AuthContextProps } from './auth.provider';
import { Toaster } from 'react-hot-toast';

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthContextProps['user']>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    onMessageListener().then(payload => {
      console.log(payload);
    });
    signInAnonymously(auth)
      .then(credential => {
        setCurrentUser(credential.user);
        setPending(false);
      })
      .catch(error => {
        console.log('Chịu');
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

import { signInAnonymously } from 'firebase/auth'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { auth } from '../libs/firebase'
import { AuthContext, AuthContextProps } from './auth.provider'

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthContextProps['user']>(null)
  const [pending, setPending] = useState(true)

  useEffect(() => {
    signInAnonymously(auth)
      .then((credential) => {
        setCurrentUser(credential.user)
        setPending(false)
      })
      .catch((error) => {
        console.log('Chịu')
        console.error('useEffect  👻  error', error)
      })
  }, [])
  if (pending) {
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

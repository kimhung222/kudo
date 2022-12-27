import type { User } from 'firebase/auth'
import React, { useContext } from 'react'

export type AuthContextProps = {
  user: User | null
}

export const AuthContext = React.createContext<AuthContextProps>({ user: null })

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('Use your brain to init the Auth Provider OK?')
  }
  return context
}

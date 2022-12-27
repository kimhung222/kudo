import React, { PropsWithChildren } from 'react'

export const PlayerLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <main className="h-screen px-4 md:px-0">{children}</main>
}

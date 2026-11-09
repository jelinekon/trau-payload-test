import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { BackgroundColorProvider } from './BackgroundColorProvider'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <BackgroundColorProvider>{children}</BackgroundColorProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}

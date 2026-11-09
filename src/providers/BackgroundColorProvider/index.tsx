'use client'

import React, { createContext, useCallback, use, useState } from 'react'

type BackgroundColor = 'beige-dark' | 'beige-light' | 'beige-very-dark' | 'black'

export interface ContextType {
  backgroundColor?: BackgroundColor | null
  setBackgroundColor: (color: BackgroundColor | null) => void
}

const initialContext: ContextType = {
  backgroundColor: undefined,
  setBackgroundColor: () => null,
}

const BackgroundColorContext = createContext(initialContext)

export const BackgroundColorProvider = ({ children }: { children: React.ReactNode }) => {
  const [backgroundColor, setColorState] = useState<BackgroundColor | undefined | null>(
    'beige-dark',
  )

  const setBackgroundColor = useCallback((colorToSet: BackgroundColor | null) => {
    setColorState(colorToSet)
  }, [])

  return (
    <BackgroundColorContext value={{ backgroundColor, setBackgroundColor }}>
      {children}
    </BackgroundColorContext>
  )
}

export const useBackgroundColor = (): ContextType => use(BackgroundColorContext)

import React from 'react'

import { Button } from '@/components/Button'

export default function NotFound() {
  return (
    <div className="container py-28 h-[50vh] flex flex-col justify-center">
      <div className="prose text-center max-w-none">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className="mb-4">This page could not be found.</p>
      </div>
      <div className="flex justify-center">
        <Button label="Go home" href="/" />
      </div>
    </div>
  )
}

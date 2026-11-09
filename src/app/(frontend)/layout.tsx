import type { Metadata } from 'next'
import { GoogleTagManager } from '@next/third-parties/google'

import { cn } from '@/utilities/ui'
// import { GeistMono } from 'geist/font/mono'
// import { GeistSans } from 'geist/font/sans'
import React from 'react'

import localFont from 'next/font/local'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
// import { draftMode } from 'next/headers'

import './globals.scss'
import { getServerSideURL } from '@/utilities/getURL'
import { BackgroundClient } from '@/components/Background'
import { NavigationHandler } from '@/components/NavigationHandler'

const sans = localFont({
  variable: '--font-sans',
  // subsets: ['latin'],
  src: [
    {
      path: '../../../public/fonts/Booton-Regular.woff2',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Booton-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
})

const caption = localFont({
  variable: '--font-caption',
  // subsets: ['latin'],
  src: [
    {
      path: '../../../public/fonts/kmrwaldenburg-semicondensedbook.woff2',
      style: 'normal',
    },
  ],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // const { isEnabled } = await draftMode()

  return (
    <html className={cn(sans.variable, caption.variable)} lang="en" suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-MMXGF4G" />
      <head>
        {/* <InitTheme /> */}

        {/* <link href="/favicon.ico" rel="icon" sizes="32x32" /> */}
        {/* <link href="/favicon.svg" rel="icon" type="image/svg+xml" /> */}
        <link href="/favicon.png" rel="icon" type="image/png" />
      </head>
      <body>
        <Providers>
          {/* <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          /> */}

          {/* <BackgroundClient /> */}

          <NavigationHandler />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}

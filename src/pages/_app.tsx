import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const initWebApp = async () => {
      if (typeof window !== 'undefined') {
        try {
          const WebApp = (await import('@twa-dev/sdk')).default
          WebApp.ready()
          WebApp.expand()
        } catch (error) {
          console.error('Failed to initialize Telegram Web App:', error)
        }
      }
    }
    
    initWebApp()
  }, [])

  return <Component {...pageProps} />
} 
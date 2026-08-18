import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import { Header } from './shared/components/headers/Header'
import { Footer } from './shared/components/footers/Footer'
import { ThemeProvider } from './contexts/theme-provider'
import { LoadingProvider, useLoading } from './contexts/loading-provider'
import { LoadingScreen } from './shared/components/loading/LoadingScreen'
import 'lenis/dist/lenis.css'

function LayoutContent() {
  const location = useLocation()
  const { startLoading, stopLoading } = useLoading()

  useEffect(() => {
    startLoading()
    const timer = setTimeout(() => {
      stopLoading()
    }, 600)
    return () => clearTimeout(timer)
  }, [location.pathname, startLoading, stopLoading])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export function Layout() {
  return (
    <ReactLenis root>
      <ThemeProvider>
        <LoadingProvider>
          <LayoutContent />
          <LoadingScreen />
        </LoadingProvider>
      </ThemeProvider>
    </ReactLenis>
  )
}

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'
import { Summary } from '../components/Summary'
import { Hobbies } from '../components/Hobbies'
import { Journey } from '../components/Journey'
import { Experience } from '../components/Experience'

export default function DeveloperPage() {
  const { hash } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (hash && lenis) {
      const target = document.querySelector(hash)
      if (target) {
        const timer = setTimeout(() => {
          lenis.scrollTo(target as HTMLElement, {
            offset: -80,
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          })
        }, 100)
        return () => clearTimeout(timer)
      }
    }
  }, [hash, lenis])

  return (
    <div className="w-full flex flex-col relative">
      <Summary />
      <Hobbies />
      <Journey />
      <Experience />
    </div>
  )
}

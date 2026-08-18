import { useTranslation } from 'react-i18next'
import { useScroll, useTransform } from 'framer-motion'
import { useLenis } from 'lenis/react'

export function useHobbies(containerRef: React.RefObject<HTMLDivElement | null>) {
  const { t } = useTranslation()
  const lenis = useLenis()

  const hobbiesItems = [
    {
      title: t('developer.hobby_subculture'),
      desc: t('developer.hobby_subculture_desc'),
      gif: 'https://media.tenor.com/7H9RgXfWIsgAAAAM/subaru.gif',
      type: 'subculture'
    },
    {
      title: t('developer.hobby_ai'),
      desc: t('developer.hobby_ai_desc'),
      quote: t('home.quote'),
      type: 'ai'
    },
    {
      title: t('developer.hobby_learning'),
      desc: t('developer.hobby_learning_desc'),
      icon: '🎶',
      type: 'learning'
    }
  ]

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const scrollRanges = [
    [0, 0.25],
    [0.25, 0.60],
    [0.60, 1.0]
  ]

  const indicatorOpacity0 = useTransform(scrollYProgress, scrollRanges[0], [0.2, 1])
  const indicatorOpacity1 = useTransform(scrollYProgress, scrollRanges[1], [0.2, 1])
  const indicatorOpacity2 = useTransform(scrollYProgress, scrollRanges[2], [0.2, 1])

  const indicatorScale0 = useTransform(scrollYProgress, scrollRanges[0], [0.9, 1.15])
  const indicatorScale1 = useTransform(scrollYProgress, scrollRanges[1], [0.9, 1.15])
  const indicatorScale2 = useTransform(scrollYProgress, scrollRanges[2], [0.9, 1.15])

  const indicatorOpacities = [indicatorOpacity0, indicatorOpacity1, indicatorOpacity2]
  const indicatorScales = [indicatorScale0, indicatorScale1, indicatorScale2]

  const cardY0 = useTransform(scrollYProgress, scrollRanges[0], [100, 0])
  const cardOpacity0 = useTransform(scrollYProgress, [0, 0.25, 0.30], [1, 1, 0])
  const cardScale0 = useTransform(scrollYProgress, [0, 0.25, 0.30], [1, 1, 0.95])

  const cardY1 = useTransform(scrollYProgress, scrollRanges[1], [100, 0])
  const cardOpacity1 = useTransform(scrollYProgress, [0.20, 0.25, 0.60, 0.65], [0, 1, 1, 0])
  const cardScale1 = useTransform(scrollYProgress, [0.20, 0.25, 0.60, 0.65], [0.95, 1, 1, 0.95])

  const cardY2 = useTransform(scrollYProgress, scrollRanges[2], [100, 0])
  const cardOpacity2 = useTransform(scrollYProgress, [0.55, 0.60, 1.0], [0, 1, 1])
  const cardScale2 = useTransform(scrollYProgress, [0.55, 0.60, 1.0], [0.95, 1, 1])

  const cardYs = [cardY0, cardY1, cardY2]
  const cardOpacities = [cardOpacity0, cardOpacity1, cardOpacity2]
  const cardScales = [cardScale0, cardScale1, cardScale2]

  const desktopParticles = [
    { size: 'w-2 h-2', left: '5%', right: undefined, top: '15%', delay: '0s', duration: '18s' },
    { size: 'w-4 h-4', left: '12%', right: undefined, top: '30%', delay: '2.5s', duration: '24s' },
    { size: 'w-3 h-3', left: '20%', right: undefined, top: '45%', delay: '5s', duration: '21s' },
    { size: 'w-5 h-5', left: '8%', right: undefined, top: '60%', delay: '1s', duration: '27s' },
    { size: 'w-2.5 h-2.5', left: '28%', right: undefined, top: '75%', delay: '7s', duration: '19s' },
    { size: 'w-3.5 h-3.5', left: '18%', right: undefined, top: '90%', delay: '3.5s', duration: '23s' },
    { size: 'w-4 h-4', left: '35%', right: undefined, top: '25%', delay: '9s', duration: '26s' },
    { size: 'w-2 h-2', left: undefined, right: '5%', top: '10%', delay: '1.5s', duration: '17s' },
    { size: 'w-4 h-4', left: undefined, right: '15%', top: '25%', delay: '4s', duration: '29s' },
    { size: 'w-3 h-3', left: undefined, right: '28%', top: '40%', delay: '8s', duration: '20s' },
    { size: 'w-5 h-5', left: undefined, right: '10%', top: '55%', delay: '3s', duration: '25s' },
    { size: 'w-2.5 h-2.5', left: undefined, right: '22%', top: '70%', delay: '6.5s', duration: '16s' },
    { size: 'w-3.5 h-3.5', left: undefined, right: '32%', top: '85%', delay: '10s', duration: '22s' },
    { size: 'w-4 h-4', left: undefined, right: '38%', top: '30%', delay: '5.5s', duration: '28s' },
    { size: 'w-3 h-3', left: undefined, right: '45%', top: '65%', delay: '11s', duration: '21s' }
  ]

  const mobileParticles = [
    { size: 'w-2 h-2', left: '10%', right: undefined, top: '15%', delay: '0s', duration: '16s' },
    { size: 'w-3.5 h-3.5', left: '30%', right: undefined, top: '45%', delay: '3s', duration: '22s' },
    { size: 'w-4 h-4', left: '20%', right: undefined, top: '75%', delay: '6s', duration: '20s' },
    { size: 'w-2.5 h-2.5', left: '45%', right: undefined, top: '30%', delay: '1.5s', duration: '18s' },
    { size: 'w-3 h-3', left: '38%', right: undefined, top: '60%', delay: '8s', duration: '24s' },
    { size: 'w-2 h-2', left: undefined, right: '10%', top: '25%', delay: '4.5s', duration: '17s' },
    { size: 'w-3.5 h-3.5', left: undefined, right: '25%', top: '55%', delay: '2.5s', duration: '23s' },
    { size: 'w-4 h-4', left: undefined, right: '15%', top: '85%', delay: '7s', duration: '21s' },
    { size: 'w-2.5 h-2.5', left: undefined, right: '35%', top: '40%', delay: '5.5s', duration: '19s' },
    { size: 'w-3 h-3', left: undefined, right: '42%', top: '70%', delay: '9.5s', duration: '25s' }
  ]

  const scrollToCard = (index: number) => {
    if (!containerRef.current || !lenis) return

    const rect = containerRef.current.getBoundingClientRect()
    const scrollTop = window.scrollY + rect.top
    const scrollHeight = containerRef.current.scrollHeight
    const scrollRange = scrollHeight - window.innerHeight

    const centers = [0.125, 0.425, 0.80]
    const targetScrollY = scrollTop + centers[index] * scrollRange

    lenis.scrollTo(targetScrollY, {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    })
  }

  return {
    t,
    hobbiesItems,
    indicatorOpacities,
    indicatorScales,
    cardYs,
    cardOpacities,
    cardScales,
    desktopParticles,
    mobileParticles,
    scrollToCard
  }
}

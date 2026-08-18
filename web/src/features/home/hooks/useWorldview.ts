import { useTranslation } from 'react-i18next'
import { useScroll, useTransform } from 'framer-motion'
import { useLenis } from 'lenis/react'

export function useWorldview(containerRef: React.RefObject<HTMLDivElement | null>) {
  const { t } = useTranslation()
  const lenis = useLenis()

  const worldviewItems = [
    { title: t('home.worldview.p1_title'), desc: t('home.worldview.p1_desc') },
    { title: t('home.worldview.p2_title'), desc: t('home.worldview.p2_desc') },
    { title: t('home.worldview.p3_title'), desc: t('home.worldview.p3_desc') },
    { title: t('home.worldview.p4_title'), desc: t('home.worldview.p4_desc') },
    { title: t('home.worldview.p5_title'), desc: t('home.worldview.p5_desc') }
  ]

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const scrollRanges = [
    [0, 0.15],
    [0.15, 0.35],
    [0.35, 0.55],
    [0.55, 0.75],
    [0.75, 1.0]
  ]

  const indicatorOpacity0 = useTransform(scrollYProgress, scrollRanges[0], [0.2, 1])
  const indicatorOpacity1 = useTransform(scrollYProgress, scrollRanges[1], [0.2, 1])
  const indicatorOpacity2 = useTransform(scrollYProgress, scrollRanges[2], [0.2, 1])
  const indicatorOpacity3 = useTransform(scrollYProgress, scrollRanges[3], [0.2, 1])
  const indicatorOpacity4 = useTransform(scrollYProgress, scrollRanges[4], [0.2, 1])

  const indicatorScale0 = useTransform(scrollYProgress, scrollRanges[0], [0.9, 1.15])
  const indicatorScale1 = useTransform(scrollYProgress, scrollRanges[1], [0.9, 1.15])
  const indicatorScale2 = useTransform(scrollYProgress, scrollRanges[2], [0.9, 1.15])
  const indicatorScale3 = useTransform(scrollYProgress, scrollRanges[3], [0.9, 1.15])
  const indicatorScale4 = useTransform(scrollYProgress, scrollRanges[4], [0.9, 1.15])

  const indicatorOpacities = [indicatorOpacity0, indicatorOpacity1, indicatorOpacity2, indicatorOpacity3, indicatorOpacity4]
  const indicatorScales = [indicatorScale0, indicatorScale1, indicatorScale2, indicatorScale3, indicatorScale4]

  const cardY0 = useTransform(scrollYProgress, scrollRanges[0], [100, 0])
  const cardOpacity0 = useTransform(scrollYProgress, [0, 0.15, 0.20], [1, 1, 0])
  const cardScale0 = useTransform(scrollYProgress, [0, 0.15, 0.20], [1, 1, 0.95])

  const cardY1 = useTransform(scrollYProgress, scrollRanges[1], [100, 0])
  const cardOpacity1 = useTransform(scrollYProgress, [0.10, 0.15, 0.35, 0.40], [0, 1, 1, 0])
  const cardScale1 = useTransform(scrollYProgress, [0.10, 0.15, 0.35, 0.40], [0.95, 1, 1, 0.95])

  const cardY2 = useTransform(scrollYProgress, scrollRanges[2], [100, 0])
  const cardOpacity2 = useTransform(scrollYProgress, [0.30, 0.35, 0.55, 0.60], [0, 1, 1, 0])
  const cardScale2 = useTransform(scrollYProgress, [0.30, 0.35, 0.55, 0.60], [0.95, 1, 1, 0.95])

  const cardY3 = useTransform(scrollYProgress, scrollRanges[3], [100, 0])
  const cardOpacity3 = useTransform(scrollYProgress, [0.50, 0.55, 0.75, 0.80], [0, 1, 1, 0])
  const cardScale3 = useTransform(scrollYProgress, [0.50, 0.55, 0.75, 0.80], [0.95, 1, 1, 0.95])

  const cardY4 = useTransform(scrollYProgress, scrollRanges[4], [100, 0])
  const cardOpacity4 = useTransform(scrollYProgress, [0.70, 0.75, 1.0], [0, 1, 1])
  const cardScale4 = useTransform(scrollYProgress, [0.70, 0.75, 1.0], [0.95, 1, 1])

  const cardYs = [cardY0, cardY1, cardY2, cardY3, cardY4]
  const cardOpacities = [cardOpacity0, cardOpacity1, cardOpacity2, cardOpacity3, cardOpacity4]
  const cardScales = [cardScale0, cardScale1, cardScale2, cardScale3, cardScale4]

  const titleText = t('home.worldview.title')

  const desktopParticles = [
    { size: 'w-2 h-2', left: '5%', right: undefined, top: '15%', delay: '0s', duration: '18s' },
    { size: 'w-4 h-4', left: '12%', right: undefined, top: '30%', delay: '2.5s', duration: '24s' },
    { size: 'w-3 h-3', left: '20%', right: undefined, top: '45%', delay: '5s', duration: '21s' },
    { size: 'w-5 h-5', left: '8%', right: undefined, top: '60%', delay: '1s', duration: '27s' },
    { size: 'w-2.5 h-2.5', left: '28%', right: undefined, top: '75%', delay: '7s', duration: '19s' },
    { size: 'w-3.5 h-3.5', left: '18%', right: undefined, top: '90%', delay: '3.5s', duration: '23s' },
    { size: 'w-4 h-4', left: '35%', right: undefined, top: '25%', delay: '9s', duration: '26s' },
    { size: 'w-2 h-2', left: '24%', right: undefined, top: '12%', delay: '11.5s', duration: '20s' },
    { size: 'w-3 h-3', left: '32%', right: undefined, top: '55%', delay: '4.5s', duration: '23s' },
    { size: 'w-2.5 h-2.5', left: '10%', right: undefined, top: '80%', delay: '8s', duration: '17s' },
    { size: 'w-4 h-4', left: '42%', right: undefined, top: '72%', delay: '6s', duration: '25s' },
    { size: 'w-2 h-2', left: undefined, right: '5%', top: '10%', delay: '1.5s', duration: '17s' },
    { size: 'w-4 h-4', left: undefined, right: '15%', top: '25%', delay: '4s', duration: '29s' },
    { size: 'w-3 h-3', left: undefined, right: '28%', top: '40%', delay: '8s', duration: '20s' },
    { size: 'w-5 h-5', left: undefined, right: '10%', top: '55%', delay: '3s', duration: '25s' },
    { size: 'w-2.5 h-2.5', left: undefined, right: '22%', top: '70%', delay: '6.5s', duration: '16s' },
    { size: 'w-3.5 h-3.5', left: undefined, right: '32%', top: '85%', delay: '10s', duration: '22s' },
    { size: 'w-4 h-4', left: undefined, right: '38%', top: '30%', delay: '5.5s', duration: '28s' },
    { size: 'w-3 h-3', left: undefined, right: '45%', top: '65%', delay: '11s', duration: '21s' },
    { size: 'w-2 h-2', left: undefined, right: '20%', top: '18%', delay: '13s', duration: '19s' },
    { size: 'w-3.5 h-3.5', left: undefined, right: '26%', top: '50%', delay: '2s', duration: '24s' },
    { size: 'w-2.5 h-2.5', left: undefined, right: '8%', top: '92%', delay: '7.5s', duration: '18s' }
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
    { size: 'w-3 h-3', left: undefined, right: '42%', top: '70%', delay: '9.5s', duration: '25s' },
    { size: 'w-2 h-2', left: '15%', right: undefined, top: '90%', delay: '11s', duration: '15s' },
    { size: 'w-3 h-3', left: undefined, right: '8%', top: '12%', delay: '12.5s', duration: '21s' }
  ]

  const scrollToCard = (index: number) => {
    if (!containerRef.current || !lenis) return

    const rect = containerRef.current.getBoundingClientRect()
    const scrollTop = window.scrollY + rect.top
    const scrollHeight = containerRef.current.scrollHeight
    const scrollRange = scrollHeight - window.innerHeight

    const centers = [0.075, 0.25, 0.45, 0.65, 0.875]
    const targetScrollY = scrollTop + centers[index] * scrollRange

    lenis.scrollTo(targetScrollY, {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    })
  }

  return {
    worldviewItems,
    titleText,
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

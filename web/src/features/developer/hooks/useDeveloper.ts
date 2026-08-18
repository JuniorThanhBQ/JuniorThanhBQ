import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function useDeveloper() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState<'lang' | 'framework' | 'devops' | 'ai' | 'others'>('lang')

  const hobbies = [
    {
      title: t('developer.hobby_subculture'),
      desc: t('developer.hobby_subculture_desc'),
      gif: 'https://media.tenor.com/7H9RgXfWIsgAAAAM/subaru.gif'
    },
    {
      title: t('developer.hobby_ai'),
      desc: t('developer.hobby_ai_desc'),
      quote: t('home.quote')
    },
    {
      title: t('developer.hobby_learning'),
      desc: t('developer.hobby_learning_desc'),
      icon: '🧠'
    }
  ]

  const milestones = [
    {
      title: t('developer.milestone_1_title'),
      desc: t('developer.milestone_1_desc'),
      year: '11/2023 - 08/2027'
    },
    {
      title: t('developer.milestone_2_title'),
      desc: t('developer.milestone_2_desc'),
      year: '07/2025 - 09/2025'
    },
    {
      title: t('developer.milestone_3_title'),
      desc: t('developer.milestone_3_desc'),
      year: '02/2026 - 05/2026'
    },{
      title: t('developer.milestone_4_title'),
      desc: t('developer.milestone_4_desc'),
      year: '07/2026 - Present'
    }
  ]

  const skills = [
    { name: 'Python', category: 'lang', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    { name: 'JavaScript', category: 'lang', color: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-500/20' },
    { name: 'Java', category: 'lang', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
    { name: 'C++', category: 'lang', color: 'bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20' },
    { name: 'Go', category: 'lang', color: 'bg-sky-500/10 text-sky-500 border-sky-500/20' },
    { name: 'Django', category: 'framework', color: 'bg-emerald-600/10 text-emerald-600 dark:text-emerald-500 border-emerald-600/20' },
    { name: 'Flask', category: 'framework', color: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20' },
    { name: 'React', category: 'framework', color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' },
    { name: 'React Native', category: 'framework', color: 'bg-cyan-600/10 text-cyan-600 dark:text-cyan-400 border-cyan-600/20' },
    { name: 'FastAPI', category: 'framework', color: 'bg-teal-500/10 text-teal-500 border-teal-500/20' },
    { name: 'NestJS', category: 'framework', color: 'bg-rose-500/10 text-rose-500 border-rose-500/20' },
    { name: 'Docker', category: 'devops', color: 'bg-sky-500/10 text-sky-500 border-sky-500/20' },
    { name: 'CI/CD', category: 'devops', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
    { name: 'Dependabot', category: 'devops', color: 'bg-blue-700/10 text-blue-700 dark:text-blue-400 border-blue-700/20' },
    { name: 'Linux', category: 'devops', color: 'bg-yellow-600/10 text-yellow-700 dark:text-yellow-400 border-yellow-600/20' },
    { name: 'Makefile', category: 'devops', color: 'bg-slate-600/10 text-slate-600 dark:text-slate-400 border-slate-600/20' },
    { name: 'Magefile', category: 'devops', color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' },
    { name: 'Prompt Engineering', category: 'ai', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
    { name: 'Agentic Coding', category: 'ai', color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' },
    { name: 'Claude AI Agents', category: 'ai', color: 'bg-orange-600/10 text-orange-600 dark:text-orange-400 border-orange-600/20' },
    { name: 'AI Model Training', category: 'ai', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
    { name: 'Git', category: 'others', color: 'bg-orange-600/10 text-orange-600 dark:text-orange-400 border-orange-600/20' },
    { name: 'GitHub', category: 'others', color: 'bg-slate-800/10 text-slate-800 dark:text-slate-300 border-slate-800/20' },
    { name: 'MySQL', category: 'others', color: 'bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20' },
    { name: 'PostgreSQL', category: 'others', color: 'bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border-indigo-600/20' },
    { name: 'Postman', category: 'others', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
    { name: 'Selenium', category: 'others', color: 'bg-green-600/10 text-green-600 dark:text-green-400 border-green-600/20' }
  ]

  const filteredSkills = skills.filter(s => s.category === activeCategory)

  const categories = [
    { id: 'lang', label: t('developer.cat_lang') },
    { id: 'framework', label: t('developer.cat_framework') },
    { id: 'devops', label: t('developer.cat_devops') },
    { id: 'ai', label: t('developer.cat_ai') },
    { id: 'others', label: t('developer.cat_others') }
  ] as const

  const summaryCards = [
    { num: '01', title: t('developer.card_01_title'), desc: t('developer.card_01_desc') },
    { num: '02', title: t('developer.card_02_title'), desc: t('developer.card_02_desc') },
    { num: '03', title: t('developer.card_03_title'), desc: t('developer.card_03_desc') },
    { num: '04', title: t('developer.card_04_title'), desc: t('developer.card_04_desc') }
  ]

  return {
    t,
    hobbies,
    milestones,
    filteredSkills,
    categories,
    activeCategory,
    setActiveCategory,
    summaryCards
  }
}

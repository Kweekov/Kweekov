import type { Case, Skill } from '../types/portfolio'

export const portfolioInfo = {
  name: 'Кутепов Кирилл', 
  nickname: 'Kweekov',
  age: 19,
  role: 'FullStack Web Developer',
}

export const skills: Skill[] = [
  { name: 'HTML', category: 'frontend' },
  { name: 'CSS', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'Vite', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'React Router DOM', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Express', category: 'backend' },
  { name: 'PHP', category: 'backend' },
  { name: 'Prisma', category: 'database' },
  { name: 'MySQL', category: 'database' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'Git', category: 'tools' },
  { name: 'npm', category: 'tools' },
  { name: 'Docker', category: 'tools' },
  { name: 'Markdown', category: 'tools' },
]

export const cases: Case[] = [
  {
    title: 'Ravir.store',
    url: 'https://ravir.store',
    status: 'main-project',
    projects: [
      { name: 'Ravir.store', url: 'https://ravir.store', status: 'completed' },
      { name: 'api.ravir.store', url: 'https://api.ravir.store', status: 'completed' },
      { name: 'world.ravir.store', url: 'https://world.ravir.store', status: 'completed' },
      { name: 'ravir.productions', url: 'https://ravir.productions', status: 'completed' },
      { name: 'ravir.delivery', url: 'https://ravir.delivery', status: 'development' },
      { name: 'api.ravir.delivery', url: 'https://api.ravir.delivery', status: 'development' },
      { name: 'courier.ravir.store', url: 'https://courier.ravir.store', status: 'development' },
    ],
  },
  {
    title: 'Echelondelamour.ru',
    url: 'https://echelondelamour.ru',
    status: 'completed',
    projects: [
      { name: 'Echelondelamour.ru', url: 'https://echelondelamour.ru', status: 'completed' },
      { name: 'api.echelondelamour.ru', url: 'https://api.echelondelamour.ru', status: 'completed' },
    ],
  },
  {
    title: 'Cashercollection.com',
    url: 'https://cashercollection.com',
    status: 'discussion',
    projects: [
      { name: 'Cashercollection.com', url: 'https://cashercollection.com', status: 'discussion' },
      { name: 'api.cashercollection.com', url: 'https://api.cashercollection.com', status: 'discussion' },
    ],
  },
]


export interface Project {
  name: string
  url: string
  status?: 'development' | 'completed' | 'almost-completed' | 'main-project' | 'discussion'
}

export interface Case {
  title: string
  url: string
  projects: Project[]
  status?: 'development' | 'completed' | 'almost-completed' | 'main-project' | 'discussion'
}

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'database' | 'tools'
}


import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Cases } from './components/Cases'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { CustomCursor } from './components/CustomCursor'

export function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <CustomCursor />
      <Navigation />
      <main className="pt-16 sm:pt-20">
        <Hero />
        <About />
        <Skills />
        <Cases />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

import type { ReactNode } from "react"

export function Container({ children }: { children: ReactNode }) {
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">{children}</div>
} 
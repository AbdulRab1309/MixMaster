'use client'

import { Spotlight } from '@/components/ui/spotlight'

export function Background() {
  return (
    <>
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-black" />
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Spotlight effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        size={300}
        springOptions={{ bounce: 0.5 }}
      />
    </>
  )
}

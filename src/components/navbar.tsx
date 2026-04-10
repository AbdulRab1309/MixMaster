'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Martini } from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/categories', label: 'Categories' },
    { href: '/search', label: 'Search' },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="border-b border-white/10 backdrop-blur-xl bg-black/20 sticky top-0 z-40"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Martini className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              MixMaster
            </span>
          </motion.div>
        </Link>
        <div className="flex items-center gap-2 md:gap-6">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href}>
              <Button
                variant="ghost"
                className={`text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 ${
                  pathname === href
                    ? 'text-white bg-white/10 border border-white/20'
                    : ''
                }`}
              >
                {label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/navbar'
import { Background } from '@/components/background'
import { Footer } from '@/components/footer'
import { Sparkles, Wine, Beer, Coffee, GlassWater, Martini } from 'lucide-react'

interface Category {
  strCategory: string
}

const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1'

const categoryIcons: Record<string, React.ReactNode> = {
  'Ordinary Drink': <GlassWater className="w-8 h-8" />,
  'Cocktail': <Martini className="w-8 h-8" />,
  'Shake': <Coffee className="w-8 h-8" />,
  'Cocoa': <Coffee className="w-8 h-8" />,
  'Shot': <Wine className="w-8 h-8" />,
  'Coffee / Tea': <Coffee className="w-8 h-8" />,
  'Homemade Liqueur': <Wine className="w-8 h-8" />,
  'Punch / Party Drink': <Beer className="w-8 h-8" />,
  'Beer': <Beer className="w-8 h-8" />,
  'Soft Drink': <GlassWater className="w-8 h-8" />,
  'Other / Unknown': <Sparkles className="w-8 h-8" />,
}

const categoryGradients = [
  'from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border-purple-500/30',
  'from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border-cyan-500/30',
  'from-pink-500/20 to-rose-500/20 hover:from-pink-500/30 hover:to-rose-500/30 border-pink-500/30',
  'from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border-amber-500/30',
  'from-emerald-500/20 to-green-500/20 hover:from-emerald-500/30 hover:to-green-500/30 border-emerald-500/30',
  'from-violet-500/20 to-indigo-500/20 hover:from-violet-500/30 hover:to-indigo-500/30 border-violet-500/30',
  'from-rose-500/20 to-red-500/20 hover:from-rose-500/30 hover:to-red-500/30 border-rose-500/30',
  'from-teal-500/20 to-cyan-500/20 hover:from-teal-500/30 hover:to-cyan-500/30 border-teal-500/30',
  'from-fuchsia-500/20 to-purple-500/20 hover:from-fuchsia-500/30 hover:to-purple-500/30 border-fuchsia-500/30',
  'from-sky-500/20 to-blue-500/20 hover:from-sky-500/30 hover:to-blue-500/30 border-sky-500/30',
  'from-lime-500/20 to-green-500/20 hover:from-lime-500/30 hover:to-green-500/30 border-lime-500/30',
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/list.php?c=list`)
      const data = await res.json()
      setCategories(data.drinks || [])
    } catch (err) {
      console.error('Error fetching categories:', err)
      setError('Failed to load categories. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Background />

      <div className="relative z-10">
        <Navbar />

        <section className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50 mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Browse Collection
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Cocktail{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Categories
              </span>
            </h1>
            <p className="text-lg text-white/60 max-w-lg mx-auto">
              Explore our collection of cocktails organized by type
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
              />
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-red-400 text-lg">{error}</p>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.strCategory}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/categories/${encodeURIComponent(category.strCategory)}`}>
                    <Card
                      className={`group bg-gradient-to-br ${categoryGradients[index % categoryGradients.length]} backdrop-blur-xl border cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10`}
                    >
                      <CardHeader className="text-center py-10">
                        <div className="mx-auto mb-4 text-white/80 group-hover:text-white transition-colors group-hover:scale-110 duration-300 transform">
                          {categoryIcons[category.strCategory] || <Martini className="w-8 h-8" />}
                        </div>
                        <CardTitle className="text-white text-xl group-hover:text-white transition-colors">
                          {category.strCategory}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        <Footer />
      </div>
    </div>
  )
}

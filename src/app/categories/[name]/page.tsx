'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { Background } from '@/components/background'
import { Footer } from '@/components/footer'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'

interface Cocktail {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
}

const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1'

export default function CategoryListPage({ params }: { params: Promise<{ name: string }> }) {
  const resolvedParams = use(params)
  const categoryName = decodeURIComponent(resolvedParams.name)
  const [cocktails, setCocktails] = useState<Cocktail[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCategorycocktails()
  }, [categoryName])

  const fetchCategorycocktails = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/filter.php?c=${encodeURIComponent(categoryName)}`)
      const data = await res.json()
      setCocktails(data.drinks || [])
    } catch (err) {
      console.error('Error fetching category cocktails:', err)
      setError('Failed to load cocktails. Please try again later.')
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
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link href="/categories">
              <Button variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Categories
              </Button>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50 mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              {categoryName}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {categoryName}{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Cocktails
              </span>
            </h1>
            {!isLoading && !error && (
              <p className="text-lg text-white/60">
                {cocktails.length} cocktail{cocktails.length !== 1 ? 's' : ''} found
              </p>
            )}
          </motion.div>

          {/* Content */}
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
          ) : cocktails.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-6xl mb-4">🍸</p>
              <p className="text-white/60 text-lg">No cocktails found in this category.</p>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cocktails.map((cocktail, index) => (
                <motion.div
                  key={cocktail.idDrink}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Link href={`/cocktail/${cocktail.idDrink}`}>
                    <Card className="group bg-white/5 border-white/10 hover:border-purple-500/50 backdrop-blur-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={cocktail.strDrinkThumb}
                          alt={cocktail.strDrink}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-white text-lg">{cocktail.strDrink}</CardTitle>
                        <CardDescription className="text-white/60 flex items-center gap-1">
                          View recipe <ArrowRight className="w-3 h-3" />
                        </CardDescription>
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

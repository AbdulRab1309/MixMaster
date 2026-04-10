'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Navbar } from '@/components/navbar'
import { Background } from '@/components/background'
import { Footer } from '@/components/footer'
import { ArrowLeft, GlassWater, ChefHat, Tag, ExternalLink } from 'lucide-react'

interface CocktailDetail {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
  strCategory?: string
  strAlcoholic?: string
  strGlass?: string
  strInstructions?: string
  strInstructionsES?: string
  strInstructionsDE?: string
  strInstructionsFR?: string
  strTags?: string
  strVideo?: string
  [key: string]: string | undefined
}

const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1'

export default function CocktailDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const cocktailId = resolvedParams.id
  const [cocktail, setCocktail] = useState<CocktailDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCocktailDetail()
  }, [cocktailId])

  const fetchCocktailDetail = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/lookup.php?i=${cocktailId}`)
      const data = await res.json()
      if (data.drinks && data.drinks[0]) {
        setCocktail(data.drinks[0])
      } else {
        setError('Cocktail not found.')
      }
    } catch (err) {
      console.error('Error fetching cocktail:', err)
      setError('Failed to load cocktail details. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const getIngredients = (c: CocktailDetail) => {
    const ingredients = []
    for (let i = 1; i <= 15; i++) {
      const ingredient = c[`strIngredient${i}`]
      const measure = c[`strMeasure${i}`]
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient, measure: measure || '' })
      }
    }
    return ingredients
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
            <Button
              variant="ghost"
              className="text-white/60 hover:text-white hover:bg-white/10"
              onClick={() => history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-24">
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
              className="text-center py-24"
            >
              <p className="text-6xl mb-4">🍸</p>
              <p className="text-red-400 text-lg mb-6">{error}</p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  Back to Home
                </Button>
              </Link>
            </motion.div>
          ) : cocktail ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/10 backdrop-blur-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="relative aspect-square md:aspect-auto md:min-h-[500px]"
                    >
                      <img
                        src={cocktail.strDrinkThumb}
                        alt={cocktail.strDrink}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 md:hidden">
                        <h1 className="text-3xl font-bold text-white">{cocktail.strDrink}</h1>
                      </div>
                    </motion.div>

                    {/* Details */}
                    <div className="p-8 md:p-10 space-y-8">
                      <div>
                        <h1 className="hidden md:block text-4xl font-bold text-white mb-4">
                          {cocktail.strDrink}
                        </h1>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {cocktail.strCategory && (
                            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                              {cocktail.strCategory}
                            </Badge>
                          )}
                          {cocktail.strAlcoholic && (
                            <Badge
                              className={
                                cocktail.strAlcoholic === 'Alcoholic'
                                  ? 'bg-pink-500/20 text-pink-300 border-pink-500/30'
                                  : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                              }
                            >
                              {cocktail.strAlcoholic}
                            </Badge>
                          )}
                          {cocktail.strGlass && (
                            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                              <GlassWater className="w-3 h-3 mr-1" />
                              {cocktail.strGlass}
                            </Badge>
                          )}
                        </div>

                        {cocktail.strTags && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Tag className="w-4 h-4 text-white/40 mt-0.5" />
                            {cocktail.strTags.split(',').map((tag, i) => (
                              <Badge key={i} variant="outline" className="border-white/20 text-white/60 text-xs">
                                {tag.trim()}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Instructions */}
                      <div>
                        <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <ChefHat className="w-5 h-5 text-purple-400" />
                          Instructions
                        </h2>
                        <p className="text-white/60 leading-relaxed">
                          {cocktail.strInstructions}
                        </p>

                        {cocktail.strInstructionsES && (
                          <details className="mt-3">
                            <summary className="text-white/40 text-sm cursor-pointer hover:text-white/60 transition-colors">
                              🇪🇸 Spanish
                            </summary>
                            <p className="text-white/50 text-sm mt-2 pl-4 border-l-2 border-white/10">
                              {cocktail.strInstructionsES}
                            </p>
                          </details>
                        )}
                        {cocktail.strInstructionsDE && (
                          <details className="mt-3">
                            <summary className="text-white/40 text-sm cursor-pointer hover:text-white/60 transition-colors">
                              🇩🇪 German
                            </summary>
                            <p className="text-white/50 text-sm mt-2 pl-4 border-l-2 border-white/10">
                              {cocktail.strInstructionsDE}
                            </p>
                          </details>
                        )}
                        {cocktail.strInstructionsFR && (
                          <details className="mt-3">
                            <summary className="text-white/40 text-sm cursor-pointer hover:text-white/60 transition-colors">
                              🇫🇷 French
                            </summary>
                            <p className="text-white/50 text-sm mt-2 pl-4 border-l-2 border-white/10">
                              {cocktail.strInstructionsFR}
                            </p>
                          </details>
                        )}
                      </div>

                      {/* Ingredients */}
                      <div>
                        <h2 className="text-lg font-semibold text-white mb-3">
                          📋 Ingredients
                        </h2>
                        <ScrollArea className="h-56 rounded-lg bg-white/5 p-4">
                          <ul className="space-y-3">
                            {getIngredients(cocktail).map((item, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                              >
                                <span className="text-white/80 font-medium">{item.ingredient}</span>
                                <span className="text-purple-400 font-medium text-sm">
                                  {item.measure.trim() || 'To taste'}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        </ScrollArea>
                      </div>

                      {/* Video link */}
                      {cocktail.strVideo && (
                        <a
                          href={cocktail.strVideo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Watch Video Tutorial
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : null}
        </section>

        <Footer />
      </div>
    </div>
  )
}

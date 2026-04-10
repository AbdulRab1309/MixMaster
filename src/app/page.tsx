'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { SplineScene } from "@/components/ui/spline-scene"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, GlassWater, Sparkles, ArrowRight, Martini, ChefHat, PartyPopper } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Background } from '@/components/background'
import { Footer } from '@/components/footer'
import Link from 'next/link'

interface Cocktail {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
  strCategory?: string
  strAlcoholic?: string
  strGlass?: string
}

interface CocktailDetail extends Cocktail {
  strInstructions?: string
  strInstructionsES?: string
  strInstructionsDE?: string
  strTags?: string
  strIngredient1?: string
  strMeasure1?: string
  strIngredient2?: string
  strMeasure2?: string
  strIngredient3?: string
  strMeasure3?: string
  strIngredient4?: string
  strMeasure4?: string
  strIngredient5?: string
  strMeasure5?: string
  strIngredient6?: string
  strMeasure6?: string
  strIngredient7?: string
  strMeasure7?: string
  strIngredient8?: string
  strMeasure8?: string
  strIngredient9?: string
  strMeasure9?: string
  strIngredient10?: string
  strMeasure10?: string
  strIngredient11?: string
  strMeasure11?: string
  strIngredient12?: string
  strMeasure12?: string
  strIngredient13?: string
  strMeasure13?: string
  strIngredient14?: string
  strMeasure14?: string
  strIngredient15?: string
  strMeasure15?: string
  strVideo?: string
}

const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1'

export default function Home() {
  const router = useRouter()
  const [randomCocktail, setRandomCocktail] = useState<CocktailDetail | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRandomCocktail()
  }, [])

  const fetchRandomCocktail = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/random.php`)
      const data = await res.json()
      if (data.drinks && data.drinks[0]) {
        setRandomCocktail(data.drinks[0])
      }
    } catch (error) {
      console.error('Error fetching random cocktail:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  const getIngredients = (cocktail: CocktailDetail) => {
    const ingredients = []
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}` as keyof CocktailDetail]
      const measure = cocktail[`strMeasure${i}` as keyof CocktailDetail]
      if (ingredient) {
        ingredients.push({ ingredient: ingredient as string, measure: measure as string })
      }
    }
    return ingredients
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Background />

      {/* Main content */}
      <div className="relative z-10">
        <Navbar />

        {/* Hero Section with 3D */}
        <section className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50 mb-4">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Premium Cocktail Experience
                  </Badge>
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                  Discover Your Next{' '}
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    Favorite Drink
                  </span>
                </h1>
                <p className="text-lg text-white/60 max-w-lg">
                  Explore hundreds of premium cocktail recipes with detailed ingredients,
                  step-by-step instructions, and professional presentation.
                </p>
              </div>

              {/* Search Form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onSubmit={handleSearch}
                className="flex gap-4"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    type="text"
                    placeholder="Search cocktails..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-14 px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  Search
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.form>

              {/* Quick actions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-4"
              >
                <Button
                  onClick={fetchRandomCocktail}
                  variant="outline"
                  className="h-12 px-6 border-white/10 text-white/80 hover:bg-white/10 hover:text-white rounded-xl"
                >
                  <PartyPopper className="w-4 h-4 mr-2" />
                  Random Cocktail
                </Button>
                <Link href="/categories">
                  <Button
                    variant="outline"
                    className="h-12 px-6 border-white/10 text-white/80 hover:bg-white/10 hover:text-white rounded-xl"
                  >
                    <ChefHat className="w-4 h-4 mr-2" />
                    Browse Categories
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right content - 3D Scene */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/20"
            >
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </section>

        {/* Featured Cocktail Section */}
        <section className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/50 mb-4">
                <GlassWater className="w-3 h-3 mr-1" />
                Featured Cocktail
              </Badge>
              <h2 className="text-4xl font-bold text-white mb-4">
                Today&apos;s Random Pick
              </h2>
              <p className="text-white/60">
                A carefully selected cocktail just for you
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
                />
              </div>
            ) : randomCocktail ? (
              <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/10 backdrop-blur-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-8 p-8">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="relative aspect-square rounded-2xl overflow-hidden"
                    >
                      <img
                        src={randomCocktail.strDrinkThumb}
                        alt={randomCocktail.strDrink}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </motion.div>

                    <div className="flex flex-col justify-center space-y-6">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-4">
                          {randomCocktail.strDrink}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {randomCocktail.strCategory && (
                            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                              {randomCocktail.strCategory}
                            </Badge>
                          )}
                          {randomCocktail.strAlcoholic && (
                            <Badge
                              variant="secondary"
                              className={
                                randomCocktail.strAlcoholic === 'Alcoholic'
                                  ? 'bg-pink-500/20 text-pink-300'
                                  : 'bg-cyan-500/20 text-cyan-300'
                              }
                            >
                              {randomCocktail.strAlcoholic}
                            </Badge>
                          )}
                        </div>
                        <p className="text-white/60 leading-relaxed">
                          {randomCocktail.strInstructions}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                          <ChefHat className="w-5 h-5 text-purple-400" />
                          Ingredients
                        </h4>
                        <ScrollArea className="h-40 rounded-lg bg-white/5 p-4">
                          <ul className="space-y-2">
                            {getIngredients(randomCocktail).map((item, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="flex justify-between text-white/80"
                              >
                                <span>{item.ingredient}</span>
                                <span className="text-purple-400 font-medium">{item.measure || 'To taste'}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </ScrollArea>
                      </div>

                      <Link href={`/cocktail/${randomCocktail.idDrink}`}>
                        <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold">
                          View Full Recipe
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </motion.div>
        </section>

        <Footer />
      </div>
    </div>
  )
}

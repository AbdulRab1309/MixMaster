'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Navbar } from '@/components/navbar'
import { Background } from '@/components/background'
import { Footer } from '@/components/footer'
import { Search, ArrowRight, Sparkles } from 'lucide-react'

interface Cocktail {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
  strCategory?: string
  strAlcoholic?: string
}

const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1'

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get('q') || ''

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [results, setResults] = useState<Cocktail[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [initialQuery])

  const performSearch = async (query: string) => {
    if (!query.trim()) return
    setIsSearching(true)
    setHasSearched(true)
    try {
      const res = await fetch(`${API_BASE_URL}/search.php?s=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResults(data.drinks || [])
    } catch (error) {
      console.error('Error searching cocktails:', error)
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    performSearch(searchQuery)
  }

  return (
    <>
      {/* Search Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50 mb-4">
          <Sparkles className="w-3 h-3 mr-1" />
          Find Your Drink
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Search{' '}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Cocktails
          </span>
        </h1>
        <p className="text-lg text-white/60 max-w-lg mx-auto mb-8">
          Find cocktails by name — try &quot;Margarita&quot;, &quot;Mojito&quot;, or &quot;Martini&quot;
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-4">
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
            disabled={isSearching}
            className="h-14 px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          >
            {isSearching ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Search className="w-5 h-5" />
              </motion.div>
            ) : (
              <>
                Search
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </form>
      </motion.div>

      {/* Results */}
      {isSearching ? (
        <div className="flex justify-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
          />
        </div>
      ) : hasSearched && results.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p className="text-6xl mb-4">🍸</p>
          <p className="text-white/60 text-lg mb-2">No cocktails found for &quot;{initialQuery}&quot;</p>
          <p className="text-white/40">Try a different search term</p>
        </motion.div>
      ) : (
        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-white/60 mb-6 text-center">
                Found <span className="text-purple-400 font-semibold">{results.length}</span> cocktail{results.length !== 1 ? 's' : ''} for &quot;{initialQuery}&quot;
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((cocktail, index) => (
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
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {!hasSearched && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-16"
        >
          <p className="text-6xl mb-4">👆</p>
          <p className="text-white/60 text-lg">Enter a cocktail name above to start searching</p>
        </motion.div>
      )}
    </>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Background />

      <div className="relative z-10">
        <Navbar />

        <section className="container mx-auto px-6 py-16">
          <Suspense fallback={
            <div className="flex justify-center py-24">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
              />
            </div>
          }>
            <SearchContent />
          </Suspense>
        </section>

        <Footer />
      </div>
    </div>
  )
}

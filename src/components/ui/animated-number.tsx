'use client'

import { motion, SpringOptions, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

interface AnimatedNumberProps {
  value: number
  className?: string
  springOptions?: SpringOptions
}

export function AnimatedNumber({
  value,
  className,
  springOptions = { bounce: 0 },
}: AnimatedNumberProps) {
  const spring = useSpring(value, springOptions)
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  )

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  return (
    <motion.span className={className}>
      {display}
    </motion.span>
  )
}

import { useState, useEffect } from 'react'
import { calculateStardate } from '@/utils/stardate'

export const useStardate = () => {
  const [stardate, setStardate] = useState('')

  useEffect(() => {
    const updateTime = () => {
      setStardate(calculateStardate())
    }

    const timer = setInterval(updateTime, 100)
    updateTime()

    return () => clearInterval(timer)
  }, [])

  return stardate
}

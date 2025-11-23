import { useState, useLayoutEffect, useRef } from 'react'

const generateGibberish = (length = 12) => {
  const chars =
    '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join('')
}

const DEFAULT_OPTIONS = {
  initialText: 'ACCESS',
  grantedText: 'ACCESS GRANTED',
  scrambleDuration: 1500,
  scrambleInterval: 50,
  gibberishLength: 12
}

export const useScrambleEffect = (options = {}) => {
  const {
    initialText = DEFAULT_OPTIONS.initialText,
    grantedText = DEFAULT_OPTIONS.grantedText,
    scrambleDuration = DEFAULT_OPTIONS.scrambleDuration,
    scrambleInterval = DEFAULT_OPTIONS.scrambleInterval,
    gibberishLength = DEFAULT_OPTIONS.gibberishLength
  } = options

  const [isHovered, setIsHovered] = useState(false)
  const [displayText, setDisplayText] = useState(initialText)
  const [isScrambling, setIsScrambling] = useState(false)
  const scrambleIntervalRef = useRef(null)
  const timeoutRef = useRef(null)

  useLayoutEffect(() => {
    if (!isHovered) {
      // Reset on mouse leave
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current)
        scrambleIntervalRef.current = null
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      // Use setTimeout to avoid setState in effect
      setTimeout(() => {
        setIsScrambling(false)
        setDisplayText(initialText)
      }, 0)
      return
    }

    // Scramble text rapidly - use setTimeout to avoid setState in effect warning
    setTimeout(() => {
      setIsScrambling(true)
      setDisplayText(generateGibberish(gibberishLength))
    }, 0)

    scrambleIntervalRef.current = setInterval(() => {
      setDisplayText(generateGibberish(gibberishLength))
    }, scrambleInterval)

    // After scramble duration, show granted text
    timeoutRef.current = setTimeout(() => {
      setIsScrambling(false)
      setDisplayText(grantedText)
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current)
        scrambleIntervalRef.current = null
      }
    }, scrambleDuration)

    return () => {
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current)
        scrambleIntervalRef.current = null
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [
    isHovered,
    initialText,
    grantedText,
    scrambleDuration,
    scrambleInterval,
    gibberishLength
  ])

  const isGranted = displayText === grantedText

  return {
    isHovered,
    setIsHovered,
    displayText,
    isScrambling,
    isGranted
  }
}

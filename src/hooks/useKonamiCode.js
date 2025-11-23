import { useState, useEffect, useCallback, useRef } from 'react'
import { playSound as playAudioSound } from '@/utils/audio'

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA'
]

const SEQUENCE_TIMEOUT = 3000 // Reset sequence after 3 seconds of inactivity

export const useKonamiCode = onActivate => {
  const [sequence, setSequence] = useState([])
  const [isActive, setIsActive] = useState(false)
  const timeoutRef = useRef(null)
  const originalColorsRef = useRef({ green: null, red: null })

  const resetSequence = useCallback(() => {
    setSequence([])
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const activateRedAlert = useCallback(() => {
    setIsActive(true)
    playAudioSound('red-alert', true)

    if (onActivate) {
      onActivate()
    }

    // Auto-deactivate after 10 seconds
    setTimeout(() => {
      setIsActive(false)
    }, 10000)
  }, [onActivate])

  useEffect(() => {
    const handleKeyDown = event => {
      // If red alert is already active, don't process keys
      if (isActive) return

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      const key = event.code
      const newSequence = [...sequence, key]

      // Check if the new sequence matches the start of Konami code
      const expectedSequence = KONAMI_CODE.slice(0, newSequence.length)
      const matches = newSequence.every((k, i) => k === expectedSequence[i])

      if (matches) {
        if (newSequence.length === KONAMI_CODE.length) {
          // Full sequence matched!
          activateRedAlert()
          resetSequence()
        } else {
          // Partial match, continue
          setSequence(newSequence)
          // Set timeout to reset if no key pressed for SEQUENCE_TIMEOUT
          timeoutRef.current = setTimeout(() => {
            resetSequence()
          }, SEQUENCE_TIMEOUT)
        }
      } else {
        // Sequence broken, reset
        resetSequence()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [sequence, isActive, activateRedAlert, resetSequence])

  // Swap CSS variables when red alert is active
  useEffect(() => {
    if (typeof document === 'undefined') return

    const root = document.documentElement

    // Store original values if not already stored and we're activating
    if (isActive && !originalColorsRef.current.green) {
      originalColorsRef.current.green = getComputedStyle(root)
        .getPropertyValue('--green')
        .trim()
      originalColorsRef.current.red = getComputedStyle(root)
        .getPropertyValue('--red')
        .trim()
    }

    // Capture values at the start for cleanup (before any mutations)
    const greenValue = originalColorsRef.current.green
    const redValue = originalColorsRef.current.red

    if (isActive) {
      // Swap the variables
      if (greenValue && redValue) {
        root.style.setProperty('--green', redValue)
        root.style.setProperty('--red', greenValue)
      }
    } else {
      // Restore original values
      if (greenValue && redValue) {
        root.style.setProperty('--green', greenValue)
        root.style.setProperty('--red', redValue)
      } else {
        // Fallback: remove inline styles to restore from CSS
        root.style.removeProperty('--green')
        root.style.removeProperty('--red')
      }
    }

    // Cleanup function to restore original values
    return () => {
      if (greenValue && redValue) {
        root.style.setProperty('--green', greenValue)
        root.style.setProperty('--red', redValue)
      } else {
        root.style.removeProperty('--green')
        root.style.removeProperty('--red')
      }
    }
  }, [isActive])

  return {
    isActive,
    deactivate: () => setIsActive(false)
  }
}

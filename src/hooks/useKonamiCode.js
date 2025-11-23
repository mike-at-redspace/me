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

  return {
    isActive,
    deactivate: () => setIsActive(false)
  }
}

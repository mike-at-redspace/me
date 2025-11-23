import { useState, useCallback } from 'react'
import { playSound as playAudioSound } from '@/utils/audio'

export const useAudio = () => {
  const [enabled, setEnabled] = useState(false)

  const toggle = useCallback(() => {
    const newState = !enabled
    setEnabled(newState)
    if (newState) {
      playAudioSound('select', true)
    }
  }, [enabled])

  const playSound = useCallback(
    (type = 'nav') => {
      playAudioSound(type, enabled)
    },
    [enabled]
  )

  return {
    enabled,
    toggle,
    playSound
  }
}

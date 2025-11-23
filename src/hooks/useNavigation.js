import { useState, useCallback } from 'react'

export const useNavigation = (initialView = 'DASHBOARD') => {
  const [activeView, setActiveView] = useState(initialView)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const navigate = useCallback(
    view => {
      if (activeView === view) return

      setIsTransitioning(true)
      setTimeout(() => {
        setActiveView(view)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 600)
      }, 900)
    },
    [activeView]
  )

  return {
    activeView,
    navigate,
    isTransitioning
  }
}

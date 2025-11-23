import { createContext, useContext } from 'react'
import { useNavigation } from '@/hooks/useNavigation'

const NavigationContext = createContext(null)

export const NavigationProvider = ({ children, initialView = 'DASHBOARD' }) => {
  const navigation = useNavigation(initialView)

  return (
    <NavigationContext.Provider value={navigation}>
      {children}
    </NavigationContext.Provider>
  )
}

export const useNavigationContext = () => {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error(
      'useNavigationContext must be used within NavigationProvider'
    )
  }
  return context
}

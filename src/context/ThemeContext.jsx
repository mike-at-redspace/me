import { createContext, useContext } from 'react'
import { colorVars } from '@/tokens'

const ThemeContext = createContext(null)

export const ThemeProvider = ({ children }) => {
  const theme = {
    colors: colorVars
  }

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

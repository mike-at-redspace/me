import { AudioProvider, NavigationProvider, ThemeProvider } from './context'
import App from './App'

export const AppWrapper = () => {
  return (
    <ThemeProvider>
      <AudioProvider>
        <NavigationProvider>
          <App />
        </NavigationProvider>
      </AudioProvider>
    </ThemeProvider>
  )
}

export default AppWrapper

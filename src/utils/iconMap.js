import { Code, FileJson } from 'lucide-react'
import * as simpleIcons from 'simple-icons'

// Map technology icon names to Lucide React icons (preferred for generic icons)
// Brand icons should use simple-icons instead
const lucideIconMap = {
  // Generic icons that work well with Lucide
  json: FileJson
  // Add more generic Lucide mappings as needed
}

/**
 * Convert icon name to simple-icons key format (siPascalCase)
 * Simple format: lowercase icon name -> si + Capitalized
 * @param {string} iconName - The name of the icon (e.g., "react", "nodedotjs")
 * @returns {string} - The key format (e.g., "react" -> "siReact", "nodedotjs" -> "siNodedotjs")
 */
const toSimpleIconKey = iconName => {
  if (!iconName) return null

  const lowerName = iconName.toLowerCase()
  // Convert to si + Capitalized first letter + rest
  return `si${lowerName.charAt(0).toUpperCase() + lowerName.slice(1)}`
}

/**
 * Get the icon component or SVG path for a given icon name
 * @param {string} iconName - The name of the icon
 * @returns {Object} - Object with either `component` (Lucide) or `svgPath` (Simple Icons) or null
 */
export const getIcon = iconName => {
  if (!iconName) return null

  const lowerName = iconName.toLowerCase()

  // First, check if we have a Lucide icon mapping (preferred for generic icons)
  if (lucideIconMap[lowerName]) {
    return { component: lucideIconMap[lowerName] }
  }

  // Try to find in simple-icons
  const simpleIconKey = toSimpleIconKey(iconName)
  if (simpleIconKey && simpleIcons[simpleIconKey]) {
    const simpleIcon = simpleIcons[simpleIconKey]
    return { svgPath: simpleIcon.path }
  }

  // Fallback: try case-insensitive search in simple-icons
  const simpleIconKeys = Object.keys(simpleIcons)
  const foundKey = simpleIconKeys.find(
    key => key.toLowerCase() === simpleIconKey?.toLowerCase()
  )

  if (foundKey) {
    return { svgPath: simpleIcons[foundKey].path }
  }

  // Default fallback to Code icon
  return { component: Code }
}

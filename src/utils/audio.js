// Sound file mappings
const SOUND_MAP = {
  nav: 'open.mp3',
  select: 'close.mp3',
  'red-alert': 'red-alert.mp3',
  'mem-150': 'device_1.mp3',
  'sys-opt': 'device_2.mp3',
  'data-7': 'device_3.mp3',
  comms: 'comms.mp3'
}

// Audio cache to preload and reuse Audio objects
const audioCache = new Map()

// Track currently playing sounds to prevent duplicates
const playingSounds = new Set()

// Base path for sounds (Astro serves /public/ at root)
// Detect base path from current location or default to /me
const getBasePath = () => {
  if (typeof window !== 'undefined') {
    // Try to get base from <base> tag or use current path
    const baseTag = document.querySelector('base')
    if (baseTag?.href) {
      try {
        const baseUrl = new URL(baseTag.href)
        return baseUrl.pathname.replace(/\/$/, '') + '/sounds/'
      } catch {
        // Fall through to default
      }
    }
    // Fallback: detect from current pathname
    const pathParts = window.location.pathname.split('/')
    if (pathParts[1] && pathParts[1] !== '') {
      return `/${pathParts[1]}/sounds/`
    }
  }
  return '/me/sounds/'
}

const SOUNDS_BASE_PATH = getBasePath()

/**
 * Get or create an Audio object for the given sound type
 */
const getAudio = type => {
  const filename = SOUND_MAP[type]
  if (!filename) {
    console.warn(`Unknown sound type: ${type}`)
    return null
  }

  // Return cached audio if available
  if (audioCache.has(type)) {
    return audioCache.get(type)
  }

  // Create new audio object
  const audio = new Audio(`${SOUNDS_BASE_PATH}${filename}`)
  audio.preload = 'auto'

  // Handle errors gracefully
  audio.addEventListener('error', e => {
    console.warn(`Failed to load sound: ${type} (${filename})`, e)
  })

  // Cache the audio object
  audioCache.set(type, audio)

  return audio
}

/**
 * Play a sound by type
 * @param {string} type - Sound type (nav, select, red-alert, etc.)
 * @param {boolean} enabled - Whether audio is enabled
 */
export const playSound = (type = 'nav', enabled = true) => {
  if (!enabled) return

  const audio = getAudio(type)
  if (!audio) return

  // Prevent duplicate plays of the same sound type within 100ms
  if (playingSounds.has(type)) {
    return
  }

  try {
    // Clone the audio to allow overlapping playback (especially for red-alert)
    const audioClone = audio.cloneNode()
    audioClone.volume = 1.0

    // Mark as playing
    playingSounds.add(type)

    // Remove from playing set when done
    audioClone.addEventListener(
      'ended',
      () => {
        playingSounds.delete(type)
      },
      { once: true }
    )

    audioClone.addEventListener(
      'error',
      () => {
        playingSounds.delete(type)
      },
      { once: true }
    )

    audioClone.play().catch(error => {
      // Handle autoplay restrictions gracefully
      playingSounds.delete(type)
      if (error.name !== 'NotAllowedError') {
        console.warn(`Failed to play sound: ${type}`, error)
      }
    })
  } catch (error) {
    playingSounds.delete(type)
    console.warn(`Error playing sound: ${type}`, error)
  }
}

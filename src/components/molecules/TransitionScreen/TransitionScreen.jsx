import { useState, useEffect, useRef } from 'react'
import styles from './TransitionScreen.module.css'

const TRANSITION_MESSAGES = [
  'PROCESSING_REQUEST...',
  'INITIALIZING_SEQUENCE...',
  'EXECUTING_PROTOCOL...',
  'CONFIGURING_SUBSYSTEMS...',
  'SYNCHRONIZING_MODULES...',
  'SCANNING_NETWORK...',
  'DEPLOYMENT_IN_PROGRESS...',
  'COMPILING_DIRECTIVES...'
]

const FOOTER_MESSAGES = [
  'REROUTING_EPS_CONDUITS',
  'RECALIBRATING_POWER_NODES',
  'REDIRECTING_TRANSMISSION_LINES',
  'SYNCHRONIZING_SENSOR_ARRAYS',
  'OVERRIDING_SAFE_MODES',
  'ACTIVATING_SHIELD_MATRIX',
  'ALIGNING_COMMUNICATION_CHANNELS',
  'INITIATING_CORE_DIAGNOSTICS'
]

// Fisher-Yates shuffle
const shuffle = array => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export const TransitionScreen = () => {
  const shuffledMessages = useRef(shuffle(TRANSITION_MESSAGES))
  const shuffledFooterMessages = useRef(shuffle(FOOTER_MESSAGES))
  const msgIndexRef = useRef(0)
  const footerIndexRef = useRef(0)

  const [message, setMessage] = useState('')
  const [footerMessage, setFooterMessage] = useState('')

  useEffect(() => {
    // Set initial messages
    setMessage(shuffledMessages.current[0])
    setFooterMessage(shuffledFooterMessages.current[0])

    // random number between 150 and 300
    const randomInterval = Math.floor(Math.random() * (350 - 150 + 1)) + 150

    const interval = setInterval(() => {
      msgIndexRef.current =
        (msgIndexRef.current + 1) % shuffledMessages.current.length
      footerIndexRef.current =
        (footerIndexRef.current + 1) % shuffledFooterMessages.current.length

      setMessage(shuffledMessages.current[msgIndexRef.current])
      setFooterMessage(shuffledFooterMessages.current[footerIndexRef.current])
    }, randomInterval)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.transitionOverlay}>
      <div className={styles.scanLine}></div>
      <span className={styles.transitionText}>{message}</span>
      <div className={styles.transitionFooter}>{footerMessage}</div>
    </div>
  )
}

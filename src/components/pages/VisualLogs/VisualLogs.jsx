import { useState, useEffect, useCallback } from 'react'
import { X } from 'lucide-react'
import { CodePenCard } from '@/components/molecules/CodePenCard'
import { CODEPENS } from '@/data/codepens'
import { useAudioContext } from '@/context/AudioContext'
import styles from './VisualLogs.module.css'

export const VisualLogs = () => {
  const [activePen, setActivePen] = useState(null)
  const { playSound } = useAudioContext()

  const handleExpand = pen => {
    playSound('nav')
    setActivePen(pen)
  }

  const handleClose = useCallback(() => {
    playSound('select')
    setActivePen(null)
  }, [playSound])

  useEffect(() => {
    if (!activePen) return

    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activePen, handleClose])

  if (activePen) {
    return (
      <div className={styles.viewer}>
        <div className={styles.viewerHeader}>
          <div className={styles.viewerTitle}>
            <span className={styles.viewerLabel}>
              SIMULATION: {activePen.title}
            </span>
            <span className={styles.viewerId}>{activePen.id}</span>
          </div>
          <button
            onClick={handleClose}
            className={styles.closeButton}
            aria-label='Close viewer'
          >
            <span>Close Datastream</span>
            <X size={20} aria-hidden='true' />
          </button>
        </div>
        <div className={styles.viewerContent}>
          <iframe
            className={styles.iframe}
            title={activePen.title}
            src={`https://codepen.io/${activePen.user}/embed/${activePen.id}?default-tab=result&theme-id=dark`}
            loading='lazy'
            allowFullScreen={true}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.visualLogs}>
      <div className={styles.header}>
        <h2 className={styles.title}>Simulations</h2>
        <span className={styles.label}>EXPERIMENT_ARCHIVE</span>
      </div>

      <div className={styles.content}>
        <div className={styles.grid}>
          {CODEPENS.map(pen => (
            <CodePenCard
              key={pen.id}
              id={pen.id}
              title={pen.title}
              image={`https://shots.codepen.io/mike-at-redspace/pen/${pen.id}-512.jpg`}
              onClick={() => handleExpand(pen)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

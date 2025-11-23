import { Briefcase, Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import { useAudioContext } from '@/context/AudioContext'
import styles from './ExperienceCard.module.css'

export const ExperienceCard = ({
  id,
  role,
  sector,
  dates,
  desc,
  highlights = [],
  color,
  className = '',
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { playSound } = useAudioContext()

  const toggle = () => {
    playSound('select')
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      className={`${styles.experienceCard} group ${isExpanded ? styles.expanded : ''} ${className}`}
      {...props}
    >
      <div
        className={styles.timelineIcon}
        style={
          isExpanded
            ? { backgroundColor: color, borderColor: color }
            : undefined
        }
        onClick={toggle}
        role='button'
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggle()
          }
        }}
        aria-expanded={isExpanded}
        aria-label={`Toggle ${role} details`}
      >
        <Briefcase
          size={16}
          className={isExpanded ? styles.iconExpanded : styles.icon}
        />
      </div>
      <div
        onClick={toggle}
        className={styles.card}
        style={{ borderColor: color }}
        role='button'
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggle()
          }
        }}
        aria-expanded={isExpanded}
        aria-controls={`experience-${id}-details`}
      >
        <div className={styles.header}>
          <div className={styles.content}>
            <div className={styles.titleRow}>
              <h3 className={styles.role}>{role}</h3>
              <span className={styles.dates}>{dates}</span>
            </div>
            <div className={styles.sector}>{sector}</div>
            <p
              className={`${styles.desc} ${isExpanded ? styles.descExpanded : ''}`}
            >
              {desc}
            </p>
          </div>
          <div className={styles.toggleIcon}>
            {isExpanded ? <Minus size={20} /> : <Plus size={20} />}
          </div>
        </div>
        <div
          id={`experience-${id}-details`}
          className={`${styles.details} ${isExpanded ? styles.detailsExpanded : ''}`}
        >
          <div className={styles.detailsContent}>
            <h4 className={styles.highlightsTitle}>
              Mission Objectives Achieved:
            </h4>
            <ul className={styles.highlights}>
              {highlights.map((item, i) => (
                <li key={i} className={styles.highlight}>
                  <span className={styles.bullet}>▹</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

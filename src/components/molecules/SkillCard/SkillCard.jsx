import { Badge } from '@/components/atoms/Badge'
import { ProgressBar } from '@/components/atoms/ProgressBar'
import styles from './SkillCard.module.css'

const getBadge = level => {
  if (level < 20) return { label: 'Beginner', color: 'var(--green)' }
  if (level < 40) return { label: 'Novice', color: 'var(--orange)' }
  if (level < 60) return { label: 'Intermediate', color: 'var(--tan)' }
  if (level < 75) return { label: 'Proficient', color: 'var(--blue)' }
  if (level < 90) return { label: 'Advanced', color: 'var(--light-blue)' }
  return { label: 'Master', color: 'var(--red)' }
}

export const SkillCard = ({
  name,
  level,
  category: _category,
  className = '',
  ...props
}) => {
  const badge = getBadge(level)

  return (
    <div className={`${styles.skillCard} ${className}`} {...props}>
      <div className={styles.header}>
        <span className={styles.name}>{name}</span>
        <span className={styles.level}>{level}%</span>
      </div>
      <ProgressBar value={level} color={badge.color} animated />
      <div className={styles.badgeContainer}>
        <Badge label={badge.label} color={badge.color} />
      </div>
    </div>
  )
}

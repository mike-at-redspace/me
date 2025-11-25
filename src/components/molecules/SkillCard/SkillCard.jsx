import { Badge } from '@/components/atoms/Badge'
import { ProgressBar } from '@/components/atoms/ProgressBar'
import { Icon } from '@/components/atoms/Icon'
import { getIcon } from '@/utils'
import * as simpleIcons from 'simple-icons'
import styles from './SkillCard.module.css'

const getBadge = level => {
  if (level < 20) return { label: 'Beginner', color: 'var(--green)' }
  if (level < 40) return { label: 'Novice', color: 'var(--orange)' }
  if (level < 60) return { label: 'Intermediate', color: 'var(--tan)' }
  if (level < 75) return { label: 'Proficient', color: 'var(--blue)' }
  if (level < 90) return { label: 'Advanced', color: 'var(--light-blue)' }
  return { label: 'Master', color: 'var(--red)' }
}

const getIconTitle = iconName => {
  if (!iconName) return ''
  const simpleIconKey = `si${iconName.charAt(0).toUpperCase() + iconName.slice(1)}`
  const simpleIcon = simpleIcons[simpleIconKey]
  return simpleIcon?.title || iconName
}

export const SkillCard = ({
  name,
  level,
  category: _category,
  icons = [],
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
      {icons.length > 0 && (
        <div className={styles.iconsContainer}>
          {icons.map((iconName, idx) => {
            const iconData = getIcon(iconName)
            const iconTitle = getIconTitle(iconName)
            if (!iconData) return null
            return (
              <div
                key={idx}
                className={styles.iconWrapper}
                title={iconTitle}
                aria-label={iconTitle}
              >
                <Icon
                  icon={iconData.component}
                  svgPath={iconData.svgPath}
                  size={18}
                  className={styles.icon}
                />
              </div>
            )
          })}
        </div>
      )}
      <div className={styles.badgeContainer}>
        <Badge label={badge.label} color={badge.color} />
      </div>
    </div>
  )
}

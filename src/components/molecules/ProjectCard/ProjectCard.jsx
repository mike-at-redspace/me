import { ExternalLink } from 'lucide-react'
import { useScrambleEffect } from '@/hooks'
import { getIcon } from '@/utils'
import { Icon } from '@/components/atoms'
import styles from './ProjectCard.module.css'

export const ProjectCard = ({
  id,
  title,
  desc,
  tags = [],
  status = 'ONLINE',
  link,
  className = '',
  ...props
}) => {
  const { setIsHovered, displayText, isScrambling, isGranted } =
    useScrambleEffect()

  let statusColor = 'var(--orange)'
  let statusClass = styles.statusOnline

  if (status === 'OFFLINE') {
    statusClass = styles.statusOffline
  } else if (status === 'ARCHIVED') {
    statusColor = 'var(--gray)'
    statusClass = styles.statusArchived
  }

  return (
    <div
      className={`${styles.projectCard} ${className}`}
      style={{ borderColor: statusColor }}
      {...props}
    >
      <div className={styles.header} style={{ backgroundColor: statusColor }}>
        <span className={styles.headerTitle}>
          {id} • {title}
        </span>
        <div className={styles.headerDots}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.description}>{desc}</p>

        <div className={styles.tags}>
          {tags.map(tag => {
            const iconData = getIcon(tag.icon)
            return (
              <span key={tag.name} className={styles.tag}>
                {iconData && (
                  <Icon
                    icon={iconData.component}
                    svgPath={iconData.svgPath}
                    size={14}
                    className={styles.tagIcon}
                  />
                )}
                {tag.name}
              </span>
            )
          })}
        </div>

        <div className={styles.footer}>
          <span className={`${styles.status} ${statusClass}`}>
            STATUS: {status}
          </span>
          {link && (
            <a
              href={link}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.link}
              aria-label={`Visit ${title}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span
                className={`${styles.linkContent} ${isScrambling ? styles.scrambling : ''} ${isGranted ? styles.granted : ''}`}
              >
                {displayText}{' '}
                {!isScrambling && <ExternalLink size={14} aria-hidden='true' />}
              </span>
              <div className={styles.scanEffect} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

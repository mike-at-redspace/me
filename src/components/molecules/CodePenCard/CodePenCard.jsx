import { Maximize2 } from 'lucide-react'
import styles from './CodePenCard.module.css'

export const CodePenCard = ({
  id,
  title,
  image,
  onClick,
  className = '',
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.card} ${className}`}
      role='button'
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
      aria-label={`View ${title}`}
      {...props}
    >
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} loading='lazy' />
        <div className={styles.imageOverlay} />
        <div className={styles.expandIcon}>
          <Maximize2 size={20} aria-hidden='true' />
        </div>
      </div>
      <div className={styles.footer}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.meta}>
          <span className={styles.id}>{id}</span>
          <div className={styles.divider} />
        </div>
      </div>
    </div>
  )
}

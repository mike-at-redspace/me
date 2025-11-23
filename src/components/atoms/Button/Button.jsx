import { useState } from 'react'
import styles from './Button.module.css'

export const Button = ({
  label,
  code,
  color,
  onClick,
  active = false,
  icon: Icon,
  className = '',
  ...props
}) => {
  const [isFlashing, setIsFlashing] = useState(false)

  const handleClick = e => {
    setIsFlashing(true)
    setTimeout(() => setIsFlashing(false), 150)
    onClick?.(e)
  }

  return (
    <button
      onClick={handleClick}
      className={`${styles.button} ${active ? styles.active : ''} ${isFlashing ? styles.flash : ''} ${className}`}
      style={{ backgroundColor: color }}
      aria-label={label}
      aria-pressed={active}
      {...props}
    >
      <div className={styles.content}>
        {Icon && (
          <div className={styles.icon}>
            <Icon size={18} className={styles.iconSvg} />
          </div>
        )}
        <span className={styles.label}>{label}</span>
      </div>
      {code && <span className={styles.code}>{code}</span>}
      <div className={styles.hoverEffect} />
    </button>
  )
}

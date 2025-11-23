import { useState } from 'react'
import { Icon } from '@/components/atoms'
import styles from './Button.module.css'

export const Button = ({
  label,
  code,
  color,
  onClick,
  active = false,
  icon: IconComponent,
  iconData,
  className = '',
  ...props
}) => {
  const [isFlashing, setIsFlashing] = useState(false)

  const handleClick = e => {
    setIsFlashing(true)
    setTimeout(() => setIsFlashing(false), 150)
    onClick?.(e)
  }

  // Support both direct icon component and iconData object (for simple-icons)
  const iconProps = iconData
    ? { icon: iconData.component, svgPath: iconData.svgPath, size: 18 }
    : IconComponent
      ? { icon: IconComponent, size: 18 }
      : null

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
        {iconProps && (
          <div className={styles.icon}>
            <Icon {...iconProps} className={styles.iconSvg} />
          </div>
        )}
        <span className={styles.label}>{label}</span>
      </div>
      {code && <span className={styles.code}>{code}</span>}
      <div className={styles.hoverEffect} />
    </button>
  )
}

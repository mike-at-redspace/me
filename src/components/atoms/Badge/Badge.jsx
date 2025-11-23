import styles from './Badge.module.css'

export const Badge = ({
  label,
  color,
  variant = 'default',
  className = '',
  ...props
}) => {
  return (
    <div
      className={`${styles.badge} ${styles[variant]} ${className}`}
      style={{ backgroundColor: color }}
      {...props}
    >
      {label}
    </div>
  )
}

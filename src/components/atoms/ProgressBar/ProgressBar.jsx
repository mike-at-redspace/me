import styles from './ProgressBar.module.css'

export const ProgressBar = ({
  value,
  max = 100,
  color,
  animated = true,
  className = '',
  ...props
}) => {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div
      className={`${styles.container} ${className}`}
      role='progressbar'
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={`Progress: ${percentage}%`}
      {...props}
    >
      <div
        className={`${styles.bar} ${animated ? styles.animated : ''}`}
        style={{
          width: `${percentage}%`,
          backgroundColor: color
        }}
      />
    </div>
  )
}

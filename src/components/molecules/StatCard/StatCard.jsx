import styles from './StatCard.module.css'

export const StatCard = ({ label, value, color, className = '', ...props }) => {
  return (
    <div
      className={`${styles.statCard} ${className}`}
      style={{ '--stat-color': color }}
      {...props}
    >
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  )
}

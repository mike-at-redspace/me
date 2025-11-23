import styles from './Block.module.css'

export const Block = ({
  color,
  text,
  height = 'h-32',
  className = '',
  ...props
}) => {
  return (
    <div
      className={`${styles.block} ${height} ${className}`}
      style={{ backgroundColor: color }}
      {...props}
    >
      <span className={styles.text}>{text}</span>
    </div>
  )
}

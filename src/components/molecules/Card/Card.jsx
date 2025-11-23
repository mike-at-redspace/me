import styles from './Card.module.css'

export const Card = ({
  title,
  children,
  borderColor,
  header,
  footer,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`${styles.card} ${className}`}
      style={{ borderColor }}
      {...props}
    >
      {header && <div className={styles.header}>{header}</div>}
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.content}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  )
}

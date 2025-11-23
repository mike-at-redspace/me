import styles from './Timeline.module.css'

export const Timeline = ({
  items = [],
  renderItem,
  className = '',
  ...props
}) => {
  return (
    <div className={`${styles.timeline} ${className}`} {...props}>
      {items.map((item, index) =>
        renderItem ? (
          renderItem(item, index)
        ) : (
          <div key={item.id || index}>{item}</div>
        )
      )}
    </div>
  )
}

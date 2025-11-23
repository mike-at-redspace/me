import styles from './Textarea.module.css'

export const Textarea = ({
  value,
  onChange,
  placeholder,
  error,
  rows = 4,
  className = '',
  ...props
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`${styles.textarea} ${error ? styles.error : ''} ${className}`}
      aria-invalid={!!error}
      aria-describedby={error ? `${props.id || 'textarea'}-error` : undefined}
      {...props}
    />
  )
}

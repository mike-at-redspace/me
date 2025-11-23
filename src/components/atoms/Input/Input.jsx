import styles from './Input.module.css'

export const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  className = '',
  ...props
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${styles.input} ${error ? styles.error : ''} ${className}`}
      aria-invalid={!!error}
      aria-describedby={error ? `${props.id || 'input'}-error` : undefined}
      {...props}
    />
  )
}

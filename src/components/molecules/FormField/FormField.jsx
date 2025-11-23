import { Input } from '@/components/atoms/Input'
import { Textarea } from '@/components/atoms/Textarea'
import styles from './FormField.module.css'

export const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  multiline = false,
  rows = 4,
  placeholder,
  className = '',
  ...props
}) => {
  const id = props.id || name
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className={`${styles.field} ${className}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && (
          <span className={styles.required} aria-label='required'>
            *
          </span>
        )}
      </label>
      {multiline ? (
        <Textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          error={error}
          rows={rows}
          required={required}
          aria-describedby={errorId}
          {...props}
        />
      ) : (
        <Input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          error={error}
          required={required}
          aria-describedby={errorId}
          {...props}
        />
      )}
      {error && (
        <div id={errorId} className={styles.error} role='alert'>
          {error}
        </div>
      )}
    </div>
  )
}

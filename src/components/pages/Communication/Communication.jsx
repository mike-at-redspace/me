import { useState } from 'react'
import { ShieldAlert } from 'lucide-react'
import { FormField } from '@/components/molecules/FormField'
import { useAudioContext } from '@/context/AudioContext'
import styles from './Communication.module.css'

export const Communication = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const { playSound } = useAudioContext()

  const handleTransmit = () => {
    playSound('select')

    if (!formData.name || !formData.email || !formData.message) {
      alert('All fields required for transmission')
      return
    }

    const subject = encodeURIComponent(`Message from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )

    window.open(
      `mailto:mpvdesign@protonmail.com?subject=${subject}&body=${body}`
    )
  }

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className={styles.communication}>
      <div className={styles.container}>
        <div className={styles.header}>
          <ShieldAlert size={48} className={styles.icon} aria-hidden='true' />
          <div>
            <h2 className={styles.title}>Open Channel</h2>
            <p className={styles.subtitle}>Subspace Frequencies Open</p>
          </div>
        </div>

        <form
          className={styles.form}
          onSubmit={e => {
            e.preventDefault()
            handleTransmit()
          }}
        >
          <div className={styles.formGrid}>
            <FormField
              label='Identity'
              name='name'
              type='text'
              value={formData.name}
              onChange={handleChange}
              placeholder='ENTER DESIGNATION'
              required
            />
            <FormField
              label='Frequency (Email)'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='ENTER FREQUENCY'
              required
            />
          </div>
          <FormField
            label='Transmission'
            name='message'
            value={formData.message}
            onChange={handleChange}
            placeholder='ENTER MESSAGE DATA...'
            multiline
            rows={6}
            required
          />
          <div className={styles.actions}>
            <button
              type='submit'
              className={styles.submitButton}
              aria-label='Transmit message'
            >
              Transmit
            </button>
          </div>
        </form>

        <div className={styles.note}>
          <p>
            <span className={styles.noteLabel}>NOTE:</span> Clicking
            &quot;Transmit&quot; will remotely trigger a communication protocol
            with your default email client.
          </p>
        </div>
      </div>
    </div>
  )
}

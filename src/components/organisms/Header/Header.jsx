import { Volume2, VolumeX, Menu, X } from 'lucide-react'
import { useStardate } from '@/hooks/useStardate'
import { useAudioContext } from '@/context/AudioContext'
import styles from './Header.module.css'

export const Header = ({
  onMenuToggle,
  mobileMenuOpen,
  className = '',
  ...props
}) => {
  const stardate = useStardate()
  const { enabled, toggle } = useAudioContext()

  return (
    <div className={`${styles.header} ${className}`} {...props}>
      <div className={styles.left}>
        <button
          onClick={onMenuToggle}
          className={styles.menuButton}
          aria-label='Toggle menu'
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
        <span
          className='text-black text-3xl font-bold tracking-tighter'
          style={{ transform: 'translateY(-4px)' }}
        >
          $ <span className='blink'>_</span>
        </span>
      </div>
      <div className={styles.right}>
        <span className={styles.stardate}>{stardate}</span>
        <button
          onClick={toggle}
          className={styles.audioButton}
          aria-label={enabled ? 'Disable audio' : 'Enable audio'}
          title={enabled ? 'Disable Audio' : 'Enable Audio'}
        >
          {enabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>
    </div>
  )
}

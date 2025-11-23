import { useState } from 'react'
import { Navigation } from '@/components/organisms/Navigation'
import { Block } from '@/components/atoms/Block'
import { useAudioContext } from '@/context/AudioContext'
import styles from './Sidebar.module.css'

export const Sidebar = ({
  navigationItems,
  mobileMenuOpen,
  onMenuClose,
  className = '',
  ...props
}) => {
  const { playSound } = useAudioContext()
  const [memFlash, setMemFlash] = useState(false)
  const [sysOptFlash, setSysOptFlash] = useState(false)
  const [dataFlash, setDataFlash] = useState(false)

  const handleMemClick = () => {
    playSound('mem-150')
    setMemFlash(true)
    setTimeout(() => setMemFlash(false), 150)
  }

  const handleSysOptClick = () => {
    playSound('sys-opt')
    setSysOptFlash(true)
    setTimeout(() => setSysOptFlash(false), 150)
  }

  const handleDataClick = () => {
    playSound('data-7')
    setDataFlash(true)
    setTimeout(() => setDataFlash(false), 150)
  }

  return (
    <aside
      className={`${styles.sidebar} ${mobileMenuOpen ? styles.open : ''} ${className}`}
      aria-label='Sidebar navigation'
      {...props}
    >
      <div className={styles.content}>
        <Navigation items={navigationItems} onItemClick={onMenuClose} />
        <div
          className={`${styles.spacer} ${memFlash ? styles.flash : ''}`}
          onClick={handleMemClick}
        >
          <span className={styles.spacerText}>MEM-150</span>
        </div>
        <div className={styles.blocks}>
          <Block
            color='var(--tan)'
            text='SYS-OPT'
            height='h-24'
            onClick={handleSysOptClick}
            className={sysOptFlash ? styles.flash : ''}
          />
          <Block
            color='var(--light-blue)'
            text='DATA-7'
            height='flex-1 lcars-elbow-bottom-left'
            onClick={handleDataClick}
            className={dataFlash ? styles.flash : ''}
          />
        </div>
      </div>
    </aside>
  )
}

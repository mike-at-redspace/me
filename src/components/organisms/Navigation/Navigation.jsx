import { useCallback } from 'react'
import { Button } from '@/components/atoms/Button'
import { useNavigationContext } from '@/context/NavigationContext'
import { useAudioContext } from '@/context/AudioContext'
import styles from './Navigation.module.css'

export const Navigation = ({
  items = [],
  onItemClick,
  className = '',
  ...props
}) => {
  const { activeView, navigate } = useNavigationContext()
  const { playSound } = useAudioContext()

  const handleNav = useCallback(
    view => {
      // Don't play sound or navigate if already on this view
      if (activeView === view) return

      // Play sound with 1300ms delay for all navigation
      setTimeout(() => {
        if (view === 'COMMUNICATION') {
          playSound('comms')
        } else {
          playSound('nav')
        }
      }, 1300)
      navigate(view)
      if (onItemClick) onItemClick()
    },
    [activeView, navigate, playSound, onItemClick]
  )

  return (
    <nav
      className={`${styles.navigation} ${className}`}
      aria-label='Main navigation'
      {...props}
    >
      {items.map(item => (
        <Button
          key={item.view}
          label={item.label}
          code={item.code}
          color={item.color}
          icon={item.icon}
          iconData={item.iconData}
          active={activeView === item.view}
          onClick={() => handleNav(item.view)}
        />
      ))}
    </nav>
  )
}

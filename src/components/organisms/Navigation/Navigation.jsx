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

  const handleNav = view => {
    playSound('nav')
    navigate(view)
    if (onItemClick) onItemClick()
  }

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
          active={activeView === item.view}
          onClick={() => handleNav(item.view)}
        />
      ))}
    </nav>
  )
}

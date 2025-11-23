import { useState } from 'react'
import { User, FileText, FolderOpen, Cpu, Radio } from 'lucide-react'
import { getIcon } from '@/utils'
import { Header } from '@/components/organisms/Header'
import { Sidebar } from '@/components/organisms/Sidebar'
import {
  Dashboard,
  ServiceRecord,
  TechSpecs,
  ProjectDatabase,
  VisualLogs,
  Communication
} from '@/components/pages'
import { TransitionScreen } from '@/components/molecules'
import { useNavigationContext } from '@/context/NavigationContext'
import { useKonamiCode } from '@/hooks'
import styles from './App.module.css'

const NAVIGATION_ITEMS = [
  {
    view: 'DASHBOARD',
    label: 'Profile',
    code: '02-231',
    color: 'var(--green)',
    icon: User
  },
  {
    view: 'SERVICE_RECORD',
    label: 'Command Logs',
    code: '12-409',
    color: 'var(--pale-orange)',
    icon: FileText
  },
  {
    view: 'PROJECTS',
    label: 'Mission Logs',
    code: '04-552',
    color: 'var(--orange)',
    icon: FolderOpen
  },
  {
    view: 'VISUAL_LOGS',
    label: 'Simulations',
    code: '09-321',
    color: 'var(--light-blue)',
    iconData: getIcon('codepen')
  },
  {
    view: 'SPECS',
    label: 'Subsystems',
    code: '11-882',
    color: 'var(--red)',
    icon: Cpu
  },
  {
    view: 'COMMUNICATION',
    label: 'Comms',
    code: '08-912',
    color: 'var(--purple)',
    icon: Radio
  }
]

const App = () => {
  const { activeView, isTransitioning } = useNavigationContext()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isActive: isRedAlert } = useKonamiCode()

  const handleMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const getPageContent = () => {
    switch (activeView) {
      case 'DASHBOARD':
        return <Dashboard />
      case 'PROJECTS':
        return <ProjectDatabase />
      case 'VISUAL_LOGS':
        return <VisualLogs />
      case 'SERVICE_RECORD':
        return <ServiceRecord />
      case 'SPECS':
        return <TechSpecs />
      case 'COMMUNICATION':
        return <Communication />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className={`${styles.app} ${isRedAlert ? styles.redAlert : ''}`}>
      <div className={styles.topBar}>
        <div className={styles.topLeft}>
          <Header
            onMenuToggle={handleMenuToggle}
            mobileMenuOpen={mobileMenuOpen}
          />
        </div>
        <div className={styles.topRight}>
          <div className={styles.topBarTop}>
            <span className={styles.topBarText}>[ DATAPORT::DEV-ENV ]</span>
          </div>
          <div className={styles.topBarBottom}>
            <div className={styles.topBarBlock1}></div>
            <div className={styles.topBarBlock2}></div>
            <div className={styles.topBarBlock3}>
              <span className={styles.topBarMode}>[ MODE: DEBUG ]</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <Sidebar
          navigationItems={NAVIGATION_ITEMS}
          mobileMenuOpen={mobileMenuOpen}
          onMenuClose={() => setMobileMenuOpen(false)}
        />

        <div className={styles.contentArea}>
          <div className={styles.decorativeCorner}></div>

          {isTransitioning && <TransitionScreen />}

          <div
            className={`${styles.contentWrapper} ${
              isTransitioning ? styles.transitioning : ''
            }`}
          >
            {getPageContent()}
          </div>

          <div className={styles.footer}>
            <span>[ STACKTRACE :: LOGGED :: DEBUGGING ]</span>
            <span>[ SESSION 0427 :: ACTIVE ]</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

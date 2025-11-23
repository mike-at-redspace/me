import { StatCard } from '@/components/molecules/StatCard'
import { Logo } from '@/components/atoms/Logo'
import { STATS } from '@/data/stats'
import { useEffect, useRef, useState } from 'react'
import { Github } from 'lucide-react'
import { useKonamiCode } from '@/hooks'
import avatarImage from '@/assets/avatar.png'
import styles from './Dashboard.module.css'

export const Dashboard = () => {
  const avatarSectionRef = useRef(null)
  const headerTextRef = useRef(null)
  const { isActive: isRedAlert } = useKonamiCode()
  const [barHeights] = useState(() =>
    Array.from({ length: 20 }, () => Math.random() * 80 + 20)
  )

  useEffect(() => {
    const matchHeights = () => {
      // Only match heights on desktop (when header is in row layout)
      if (window.innerWidth >= 768) {
        if (avatarSectionRef.current && headerTextRef.current) {
          const headerTextHeight = headerTextRef.current.offsetHeight
          avatarSectionRef.current.style.height = `${headerTextHeight}px`
        }
      } else {
        // Reset height on mobile
        if (avatarSectionRef.current) {
          avatarSectionRef.current.style.height = 'auto'
        }
      }
    }

    matchHeights()
    window.addEventListener('resize', matchHeights)
    return () => window.removeEventListener('resize', matchHeights)
  }, [])

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div ref={avatarSectionRef} className={styles.avatarSection}>
          <a
            href='https://github.com/mike-at-redspace'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.avatarLink}
          >
            <img
              src={avatarImage.src || avatarImage}
              alt='Developer Avatar'
              className={styles.avatar}
            />
          </a>
        </div>
        <div ref={headerTextRef} className={styles.headerText}>
          <h1 className={styles.title}>
            {isRedAlert ? 'Status:  RED ALERT ENGAGED' : 'Status: Systems Nominal'}
          </h1>
          <h2 className={styles.subtitle}>
            <a
              href='https://github.com/mike-at-redspace'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.githubLink}
            >
              mike-at-redspace
            </a>
            {' '}
            <Github size={20} className={styles.githubIcon} />
          </h2>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.intro}>
          <div className={styles.introCard}>
            <div className={styles.scanComplete}>BIO_SCAN_COMPLETE</div>
            <p className={styles.introText}>
              Starfleet-rated frontend specialist with over 10 stellar cycles of
              active service, focused on precision UI systems, enforced
              accessibility protocols, and SEO and LLM optimization protocols.
              Fluent in JavaScript command structures and modern CSS frameworks,
              with confirmed backend architecture capability. Adaptable under
              legacy system conditions and committed to continuous system
              enhancement.
            </p>
          </div>

          <div className={styles.infoCards}>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Current Mission</span>
              <Logo width={72} className={styles.logo} />
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Status</span>
              <span className={styles.infoValue}>READY_TO_ENGAGE</span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Sector</span>
              <span className={styles.infoValue}>ESEC-CAN-α</span>
            </div>
          </div>
        </div>

        <div className={styles.stats}>
          {STATS.map((stat, idx) => (
            <StatCard
              key={idx}
              label={stat.label}
              value={stat.value}
              color='var(--green)'
            />
          ))}
        </div>

        <div className={styles.diagnostics}>
          <div className={styles.diagnosticsLabel}>
            SYSTEM_DIAGNOSTICS::ALL_READINGS_NORMAL
          </div>
          <div className={styles.bars}>
            {barHeights.map((height, i) => (
              <div
                key={i}
                className={styles.bar}
                style={{
                  height: `${height}%`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

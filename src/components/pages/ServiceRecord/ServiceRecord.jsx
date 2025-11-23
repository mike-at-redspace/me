import { Timeline } from '@/components/organisms/Timeline'
import { ExperienceCard } from '@/components/organisms/ExperienceCard'
import { EXPERIENCE } from '@/data/experience'
import styles from './ServiceRecord.module.css'

export const ServiceRecord = () => {
  return (
    <div
      className={styles.serviceRecord}
      style={{ '--scroll-color': 'var(--pale-orange)' }}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Command Logs</h2>
        <span className={styles.label}>ASSIGNMENT_LOG</span>
      </div>

      <div className={styles.content}>
        <Timeline
          items={EXPERIENCE}
          renderItem={job => (
            <ExperienceCard
              id={job.id}
              role={job.role}
              sector={job.sector}
              dates={job.dates}
              desc={job.desc}
              highlights={job.highlights}
              color={job.color}
            />
          )}
        />
      </div>
    </div>
  )
}

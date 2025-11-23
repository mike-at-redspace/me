import { ProjectCard } from '@/components/molecules/ProjectCard'
import { PROJECTS } from '@/data/projects'
import styles from './ProjectDatabase.module.css'

export const ProjectDatabase = () => {
  return (
    <div className={styles.projectDatabase}>
      <div className={styles.header}>
        <h2 className={styles.title}>Mission Logs</h2>
        <span className={styles.label}>ENTRIES: {PROJECTS.length}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.grid}>
          {PROJECTS.map(proj => (
            <ProjectCard
              key={proj.id}
              id={proj.id}
              title={proj.title}
              desc={proj.desc}
              tags={proj.tags}
              status={proj.status}
              link={proj.link}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

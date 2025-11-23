import { Activity } from 'lucide-react'
import { SkillCard } from '@/components/molecules/SkillCard'
import { SKILLS } from '@/data/skills'
import styles from './TechSpecs.module.css'

export const TechSpecs = () => {
  return (
    <div className={styles.techSpecs}>
      <div className={styles.header}>
        <h2 className={styles.title}>Subsystems</h2>
        <span className={styles.label}>SUBSYSTEM_UNLOCKED</span>
      </div>

      <div className={styles.content}>
        <div className={styles.skills}>
          {SKILLS.map((category, idx) => (
            <div key={idx} className={styles.category}>
              <h3 className={styles.categoryTitle}>{category.category}</h3>
              <div className={styles.skillGrid}>
                {category.items.map((skill, sIdx) => (
                  <SkillCard
                    key={sIdx}
                    name={skill.name}
                    level={skill.level}
                    category={category.category}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.note}>
            <p>
              SYSTEM_NOTE: All technical proficiencies are subject to continuous
              optimization cycles.
            </p>
            <p className={styles.update}>LAST_UPDATE: STARDATE 48211.3</p>
          </div>
          <div className={styles.activity}>
            <Activity className={styles.activityIcon} />
          </div>
        </div>
      </div>
    </div>
  )
}

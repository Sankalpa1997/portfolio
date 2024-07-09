import React, { useEffect, useState } from 'react';
import styles from './experience.module.css';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import frontMatter from 'front-matter';
import RightArrow from './icons/RightArrow';

const fetchMarkdownFile = async (filePath) => {
  const response = await fetch(filePath);
  const text = await response.text();
  const { attributes, body } = frontMatter(text);
  const htmlContent = await remark().use(remarkHtml).process(body);
  return { ...attributes, tasks: htmlContent.toString() };
};

export default function Experience() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const loadExperiences = async () => {
      const experienceFiles = [
        '/data/experiences/splashbox.md',
        '/data/experiences/treinetic.md',
      ];
      const promises = experienceFiles.map(file => fetchMarkdownFile(file));
      const experiences = await Promise.all(promises);
      setExperiences(experiences);
    };

    loadExperiences();
  }, []);

  return (
    <section id="experience" className="section-padding-bottom">
      <div className={styles.experienceContainer}>
        {experiences.map((exp, index) => (
          <div key={index} className={styles.experienceWrapper}>

            <h3>
              <span className={styles.position}>{exp.position}</span>
              <span className={styles.companyName}>
                {' '}@ <a href={exp.companyWebsite} target="_blank" rel="noopener noreferrer">{exp.companyName}</a>
              </span>
            </h3>

            <p className={styles.duration}>{`${exp.startDate} - ${exp.endDate}`}</p>

            <div className={styles.projectsContainer}>
              <ul>
              {exp.projects && exp.projects.map((project, i) => (
                <li key={i} className={styles.projectItem}>
                  <a className='iconLink' href={project.url} target="_blank" rel="noopener noreferrer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 10L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 13L18 11C19.3807 9.61929 19.3807 7.38071 18 6V6C16.6193 4.61929 14.3807 4.61929 13 6L11 8M8 11L6 13C4.61929 14.3807 4.61929 16.6193 6 18V18C7.38071 19.3807 9.61929 19.3807 11 18L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>{project.title}</span>
                  </a>
                </li>
              ))}
              </ul>
            </div>

            <div className={`${styles.descriptionWrapper} text-slate`} dangerouslySetInnerHTML={{ __html: exp.tasks }} />
            
            <div className={styles.skills}>
              {exp.skills && exp.skills.map((skill, i) => (
                <span key={i} className="pill">{skill}</span>
              ))}
            </div>

          </div>
        ))}

        <div>
          <a className="iconLink w-500" href="./data/Sankalpa Senevirathne - Full Stack Developer.pdf" target="_blank" rel="noopener noreferrer">
            <span>View Detailed Resume</span>
            <RightArrow />
          </a>
        </div>
      </div>
    </section>
  );
}

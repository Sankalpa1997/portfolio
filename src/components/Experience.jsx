import React, { useEffect, useState } from 'react';
import styles from './Experience.module.css';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import frontMatter from 'front-matter';

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
              <span key={i} className={styles.skillPill}>{skill}</span>
            ))}
          </div>

        </div>
      ))}

      <div>
        <a className={`iconLink ${styles.resumeLink}`} href="./data/Sankalpa Senevirathne - Full Stack Developer.pdf" target="_blank" rel="noopener noreferrer">
          <span>View Detailed Resume</span>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 256 256">
            <g fill="currentColor" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}>
              <g transform="scale(10.66667,10.66667)">
                <path d="M3,3v18h18v-9h-2v7h-14v-14h7v-2zM14,3v2h3.58594l-9.29297,9.29297l1.41406,1.41406l9.29297,-9.29297v3.58594h2v-7z"></path>
              </g>
            </g>
          </svg>
        </a>
      </div>
    </div>
  );
}

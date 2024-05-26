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
            <span className={styles.companyName}> @ {exp.companyName}</span>
          </h3>
          <p>{`${exp.startDate} - ${exp.endDate}`}</p>
          <div dangerouslySetInnerHTML={{ __html: exp.tasks }} />
        </div>
      ))}
    </div>
  );
}

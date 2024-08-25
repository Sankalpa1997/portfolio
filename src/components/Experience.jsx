import React, { useEffect, useState } from "react";
import styles from "./experience.module.css";
import { remark } from "remark";
import remarkHtml from "remark-html";
import frontMatter from "front-matter";
import RightArrow from "./icons/RightArrow";
import { motion } from "framer-motion";

const fetchMarkdownFile = async (filePath) => {
  const response = await fetch(filePath);
  const text = await response.text();
  const { attributes, body } = frontMatter(text);
  const htmlContent = await remark().use(remarkHtml).process(body);
  return { ...attributes, tasks: htmlContent.toString() };
};

const fadeInLeftWithBlur = {
  hidden: { opacity: 0, x: -50, filter: 'blur(10px)' }, 
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)', 
    transition: {
      duration: 0.3, 
      staggerChildren: 0.2, 
    },
  },
};

const experienceCardVariant = {
  hidden: { opacity: 0, x: -50, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.3, // Duration for each card
    },
  },
};

export default function Experience() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const loadExperiences = async () => {
      const experienceFiles = [
        "/data/experiences/splashbox.md",
        "/data/experiences/treinetic.md",
      ];
      const promises = experienceFiles.map((file) => fetchMarkdownFile(file));
      const experiences = await Promise.all(promises);
      setExperiences(experiences);
    };

    loadExperiences();
  }, []);

  return (
    <motion.section
      id="experience"
      className="section-padding-bottom"
      initial="hidden"
      whileInView="visible"
      variants={fadeInLeftWithBlur}
      viewport={{ amount: 0.2 }}
    >
      <div className="section-header-wrapper">
        <h2>
          Experience
          <span className="text-green">.</span>
        </h2>
        <div className="section-header-line"></div>
      </div>
      <motion.div className={styles.experienceContainer} variants={fadeInLeftWithBlur}>
        {experiences.map((exp, index) => (
          <motion.div key={index} className={styles.experienceWrapper} variants={experienceCardVariant}>
            <h3>
              <span className={styles.position}>{exp.position}</span>
              <span className={styles.companyName}>
                {" "}
                @{" "}
                <a
                  href={exp.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {exp.companyName}
                </a>
              </span>
            </h3>

            <p
              className={styles.duration}
            >{`${exp.startDate} - ${exp.endDate}`}</p>

            <div className={styles.projectsContainer}>
              <ul>
                {exp.projects &&
                  exp.projects.map((project, i) => (
                    <li key={i} className={styles.projectItem}>
                      <a
                        className="iconLink"
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14 10L10 14"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 13L18 11C19.3807 9.61929 19.3807 7.38071 18 6V6C16.6193 4.61929 14.3807 4.61929 13 6L11 8M8 11L6 13C4.61929 14.3807 4.61929 16.6193 6 18V18C7.38071 19.3807 9.61929 19.3807 11 18L13 16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span>{project.title}</span>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            <motion.div
              className={`${styles.descriptionWrapper} text-slate`}
              dangerouslySetInnerHTML={{ __html: exp.tasks }}
              variants={experienceCardVariant}
            />

            <motion.div className={styles.skills} variants={experienceCardVariant}>
              {exp.skills &&
                exp.skills.map((skill, i) => (
                  <span key={i} className="pill">
                    {skill}
                  </span>
                ))}
            </motion.div>
          </motion.div>
        ))}

        <motion.div>
          <a
            className="iconLink w-500"
            href="./data/Sankalpa Senevirathne - Full Stack Developer.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>View Detailed Resume</span>
            <RightArrow />
          </a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

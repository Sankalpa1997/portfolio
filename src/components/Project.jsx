import React, { useEffect, useState } from "react";
import { remark } from "remark";
import remarkHtml from "remark-html";
import frontMatter from "front-matter";
import styles from "./project.module.css";

const fetchMarkdownFile = async (filePath) => {
    const response = await fetch(filePath);
    const text = await response.text();
    const { attributes, body } = frontMatter(text);
    const htmlContent = await remark().use(remarkHtml).process(body);
    return { ...attributes, description: htmlContent.toString() };
  };

export default function Project() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      const projectFiles = [
        '/data/projects/civiq.md',
        // Add other project files here
      ];
      const promises = projectFiles.map(file => fetchMarkdownFile(file));
      const projects = await Promise.all(promises);
      setProjects(projects);
    };

    loadProjects();
  }, []);;

  return (
    <section id="project" className="section-padding-bottom">
      <div className="projects-wrapper">
        {projects.map((project, index) => (
          <div key={index} className={styles.project}>
            <h3>{project.title}</h3>
            <h4>{project.companyName}</h4>
            <a href={project.projectURL} target="_blank" rel="noopener noreferrer">
                <span>Visit Project </span>
            </a>
            <div dangerouslySetInnerHTML={{ __html: project.description }} />
            {project.description}
            <div className={styles.techStack}>
                <h4>Tech Stack:</h4>
                {project.techStack && project.techStack.map((tech, i) => (
                <span key={i} className={styles.techPill}>{tech}</span>
                ))}
            </div>
            <div className={styles.plugins}>
                <h4>Plugins:</h4>
                {project.plugins && project.plugins.map((plugin, i) => (
                <span key={i} className={styles.plugin}>{plugin}</span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

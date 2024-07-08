import React, { useEffect, useState } from "react";
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import frontMatter from "front-matter";
import styles from "./project.module.css";
import CircledArrow from "./icons/CircledArrow";

const fetchMarkdownFile = async (filePath) => {
  try {
    const response = await fetch(filePath);
    const text = await response.text();
    // console.log('Fetched Markdown File:', text);

    // Parse front matter and body
    const { attributes, body } = frontMatter(text);
    const htmlContent = await remark().use(remarkHtml).process(body);
    
    // console.log('Attributes:', attributes);
    // console.log('Body:', body);

    const imagePath = `/data/projects/images/${attributes.image}`;

    // Return attributes with plain text description
    return { ...attributes, desc: htmlContent.toString(), imagePath }; // Assuming body is plain text

  } catch (error) {
    console.error('Error fetching or processing markdown file:', error);
    throw error; // Rethrow error for higher-level handling
  }
};

export default function Project() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectFiles = [
          '/data/projects/civiq.md',
          '/data/projects/halifax.md',
          '/data/projects/plugseven.md',
          '/data/projects/aqualine.md'
        ];
        const promises = projectFiles.map(file => fetchMarkdownFile(file));
        const projects = await Promise.all(promises);
        // console.log('Projects:', projects);

        projects.forEach(project => {
          // console.log('Title:', project.title);
          // console.log('Description:', project.desc);
          // console.log('Image Path:', project.imagePath);
          // Display or use this information in your application
      });

        setProjects(projects);
      } catch (error) {
        console.error('Error loading projects:', error);
        // Handle error state as needed
      }
    };

    loadProjects();
  }, []);

  return (
    <section id="projects" className="section-padding-bottom">
      <div className={styles.projectsWrapper}>
        {projects.map((project, index) => (
          <a key={index} href={project.projectURL} target="_blank" rel="noopener noreferrer" className={styles.projectCard}>
            <div>
              <span className={styles.featuredTitle}>Featured Project</span>
              <h3>{project.title}</h3>
              <h4 className={styles.projectCompanyName}>@{project.companyName}</h4>
              <div className={styles.projectInfoWrapper}>
                <div className={styles.projectDescriptionContainer}>
                  <div><p className="relaxed">{project.description}</p></div>
                  <div className="iconButton">
                    <span className="">Visit Project</span>
                    <CircledArrow />
                  </div>
                </div>
                <div className={styles.projectImageContainer}>
                  
                  <img src={project.imagePath} alt={`${project.title} Screenshot`} />
                </div>
              </div>

              {/* <div dangerouslySetInnerHTML={{ __html: project.desc }} /> */}

              <div className={styles.techStack}>
                {project.techStack && project.techStack.map((tech, i) => (
                  <span key={i} className="pill">{tech}</span>
                ))}
              </div>
              <div className={styles.plugins}>
                {project.plugins && project.plugins.map((plugin, i) => (
                  <span key={i} className="pill">{plugin}</span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

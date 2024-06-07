import About from "./About";
import Experience from "./Experience";
import Project from "./Project";
import styles from "./content.module.css";
export default function Content() {
  return (
    <div className={styles.content}>
      <About />
      <Experience />
      <Project />
    </div>
  );
}

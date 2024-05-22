import About from "./About";
import Experience from "./Experience";
import styles from "./content.module.css";
export default function Content() {
  return (
    <div className={styles.content}>
      <About />
      <Experience />
    </div>
  );
}

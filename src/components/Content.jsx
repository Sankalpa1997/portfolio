import About from "./About";
import styles from "./content.module.css";
export default function Content() {
  return (
    <div className={styles.content}>
      <About />
    </div>
  );
}

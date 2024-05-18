import styles from "./navbar.module.css";
export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <a href="">
            <span className={styles.navIndicator}></span>
            <span>About</span>
          </a>
        </li>
        <li>
          <a href="">
            <span className={styles.navIndicator}></span>
            <span>Experience</span>
          </a>
        </li>
        <li>
          <a href="">
            <span className={styles.navIndicator}></span>
            <span>Projects</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

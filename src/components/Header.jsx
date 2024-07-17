import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.heroTitle}>Hello! I'm Sankalpa<span className="text-green">.</span></h1>
        <h2 className="text-white w-500">I'm a <span className="text-green">Full Stack Developer</span></h2>
        <p className="relaxed">
          I can transform your ideas into seamless and captivating digital experiences.
        </p>
        <a href="">Let's Connect</a>
        <Navbar />
      </div>
      <div>
        <SocialIcons />
      </div>
    </header>
  );
}

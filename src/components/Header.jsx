import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <h1 className="text-white">Sankalpa Senevirathne</h1>
        <h2 className="text-white w-500">Full Stack Developer</h2>
        <p>
          Web Wizard at Work : Weaving Imaginations Into Digital Experiences
        </p>
        <Navbar />
      </div>
      <div>
        <SocialIcons />
      </div>
    </header>
  );
}

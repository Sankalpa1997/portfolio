import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import styles from "./header.module.css";
import profilePic from '../assets/Sankalpa-Senevirathne.webp';

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <div className={styles.headerContentWrapper}>
          <div className={styles.profilePicWrapper}>
            <img src={profilePic} alt="Profile" />
          </div>
          <h1 className={styles.heroTitle}>Hi! I'm Sankalpa<span className="text-green">.</span></h1>
          <h2 className="text-white w-500">I'm a <span className="text-green">Full Stack Developer</span></h2>
          <p className="relaxed">
            I transform ideas into seamless and captivating digital experiences.
          </p>
          <a className="btn" href="">Let's Connect</a>
        </div>
        <Navbar />
      </div>
      <div>
        <SocialIcons />
      </div>
    </header>
  );
}

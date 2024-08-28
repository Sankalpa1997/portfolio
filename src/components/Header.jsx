import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import styles from "./header.module.css";
import profilePic from '../assets/Sankalpa-Senevirathne.webp';

export default function Header() {

  const handleConnectClick = (e) => {

    ReactGA.event({
      category: 'Social',
      action: 'Click',
      label: 'LinkedIn Profile',
    });

  };

  return (
    <header className={styles.header}>
      <div>
        <div className={styles.headerContentWrapper}>
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <filter id="blobFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="3" result="warp" />
              <feDisplacementMap in="SourceGraphic" in2="warp" scale="20" />
            </filter>
          </svg>
          <div className={styles.profilePicWrapper}>
            <img src={profilePic} alt="Profile" />
          </div>
          <h1 className={styles.heroTitle}>Hi! I'm Sankalpa<span className="text-green">.</span></h1>
          <h2 className="text-white w-500">I'm a <span className="text-green">Full Stack Developer</span></h2>
          <p className="relaxed">
            I transform ideas into seamless and captivating digital experiences.
          </p>
          <a className="btn" href="https://www.linkedin.com/in/sankalpasenevirathne/" target="_blank" onClick={handleLinkedInClick}>Let's Connect</a>
        </div>
        <Navbar />
      </div>
      <div>
        <SocialIcons />
      </div>
    </header>
  );
}

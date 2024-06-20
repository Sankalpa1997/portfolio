import React, { useEffect } from 'react';
import styles from "./navbar.module.css";

export default function Navbar() {

  const handleLinkClick = (event, id) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <a href="#about" onClick={(event) => handleLinkClick(event, 'about')}>
            <span className={styles.navIndicator}></span>
            <span>About</span>
          </a>
        </li>
        <li>
          <a href="#experience"  onClick={(event) => handleLinkClick(event, 'experience')}>
            <span className={styles.navIndicator}></span>
            <span>Experience</span>
          </a>
        </li>
        <li>
          <a href="#project"  onClick={(event) => handleLinkClick(event, 'project')}>
            <span className={styles.navIndicator}></span>
            <span>Projects</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

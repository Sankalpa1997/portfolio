import React, { useState, useEffect } from 'react';
import styles from './navbar.module.css';
import MenuItem from './MenuItem';

const sections = {
  about: null,
  experience: null,
  projects: null,
};

export default function Navbar() {
  const [activeItem, setActiveItem] = useState('about');
  const [isLinkClicked, setIsLinkClicked] = useState(false);

  useEffect(() => {
    const getAnchorPoints = () => {
      for (const key in sections) {
        const element = document.getElementById(key);
        if (element) {
          sections[key] = element.offsetTop;
        }
      }
    };

    const handleScroll = () => {
      if (isLinkClicked) return; // Skip if a link was clicked

      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let currentSection = '';
      for (const section in sections) {
        if (sections[section] <= scrollPosition) {
          currentSection = section;
        }
      }

      if (currentSection && currentSection !== activeItem) {
        setActiveItem(currentSection);
      }
    };

    getAnchorPoints();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeItem, isLinkClicked]);

  const handleLinkClick = (event, id) => {
    event.preventDefault();
    setIsLinkClicked(true); // Indicate that a link was clicked

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    setActiveItem(id);
    setTimeout(() => setIsLinkClicked(false), 1000); // Reset the flag after scrolling
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const menuList = Object.keys(sections).map((section, index) => (
    <MenuItem
      key={`menuitem_${index}`}
      itemName={section}
      displayName={capitalizeFirstLetter(section)}
      active={section === activeItem}
      onClick={(event) => handleLinkClick(event, section)}
    />
  ));

  return (
    <nav className={styles.nav}>
      <ul>{menuList}</ul>
    </nav>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import styles from './navbar.module.css';
import MenuItem from './MenuItem';

const sections = {
  about: null,
  experience: null,
  projects: null,
};

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('about');
  const isScrollingRef = useRef(false);

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
      if (isScrollingRef.current) return;

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
  }, [activeItem]);

  const handleLinkClick = (event, id) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      isScrollingRef.current = true;
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setActiveItem(id);

      // Re-enable the scroll event listener after the scrolling animation completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000); // Adjust this timeout based on your scroll animation duration
    }
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
};

export default Navbar;

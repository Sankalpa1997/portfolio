import React, { useState, useEffect } from 'react';
import styles from './navbar.module.css';
import MenuItem from './MenuItem';

const sections = {
  about: null,
  experience: null,
  project: null,
};

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('about');

  useEffect(() => {
    const contentDiv = document.getElementById('content');

    if (!contentDiv) {
      console.error('Content div not found');
      return;
    }

    const getAnchorPoints = () => {
      for (const key in sections) {
        const element = document.getElementById(key);
        if (element) {
          sections[key] = element.offsetTop;
          // console.log(`Section ${key} position:`, sections[key]);
        }
      }
    };

    const handleScroll = () => {
      // console.log('scrolling');
      const scrollPosition = contentDiv.scrollTop + contentDiv.clientHeight / 2;
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
    contentDiv.addEventListener('scroll', handleScroll);

    return () => {
      console.log('Cleanup: Removing scroll event listener');
      contentDiv.removeEventListener('scroll', handleScroll);
    };
  }, [activeItem]);

  const handleLinkClick = (event, id) => {
    console.log('click');
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setActiveItem(id);
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

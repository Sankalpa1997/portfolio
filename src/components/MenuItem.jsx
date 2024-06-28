import React from 'react';
import styles from './navbar.module.css';

const MenuItem = ({ itemName, displayName, active, onClick }) => {
  return (
    <li>
      <a href={`#${itemName}`} onClick={onClick} className={active ? styles.active : ''}>
        <span className={styles.navIndicator}></span>
        <span>{displayName}</span>
      </a>
    </li>
  );
};

export default MenuItem;

import React, { useEffect, useState } from 'react';
import styles from './mouseGradient.module.css';

export default function MouseGradient() {
  const [mouseXpercentage, setMouseXpercentage] = useState(50);
  const [mouseYpercentage, setMouseYpercentage] = useState(50);
  const [mouseX, setMouseX] = useState(50);
  const [mouseY, setMouseY] = useState(50);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const adjustedY = event.clientY + scrollY;

      setMouseX((event.clientX / windowWidth) * 100);
      setMouseY((adjustedY / (document.documentElement.scrollHeight)) * 100);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div 
        className={styles.mouseGradient} 
        style={{ 
          background: `radial-gradient(600px at ${mouseX}% ${mouseY}%, rgba(29, 78, 216, 0.15), transparent 80%)`
        }}
      ></div>
    </>
  );
}

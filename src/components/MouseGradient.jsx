import React, { useEffect, useState } from 'react';
import styles from './mouseGradient.module.css';

export default function MouseGradient() {
  const [mouseXpercentage, setMouseXpercentage] = useState(50);
  const [mouseYpercentage, setMouseYpercentage] = useState(50);
  const [mouseXpercentageM, setMouseXpercentageM] = useState(50);
  const [mouseYpercentageM, setMouseYpercentageM] = useState(50);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      setMouseXpercentage(Math.round(100 - (event.pageX / windowWidth * 100)));
      setMouseYpercentage(Math.round(100 - (event.pageY / windowHeight * 100)));
      setMouseXpercentageM(Math.round(event.pageX / windowWidth * 100));
      setMouseYpercentageM(Math.round(event.pageY / windowHeight * 100));
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* <div 
        className={styles.element} 
        style={{ backgroundPosition: `${mouseXpercentage}% ${mouseYpercentage}%` }}
      ></div> */}
      <div 
        className={styles.mouseGradient} 
        style={{ 
          background: `radial-gradient(600px at ${mouseXpercentageM}% ${mouseYpercentageM}%, rgba(29, 78, 216, 0.15), transparent 80%)`
        }}
      ></div>
    </>
  );
}

import Navbar from "./Navbar";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className="text-white">Sankalpa Senevirathne</h1>
      <h2 className="text-white w-500">Full Stack Developer</h2>
      <p>Web Wizard at Work : Weaving Imaginations Into Digital Experiences</p>
      <Navbar />
    </header>
  );
}

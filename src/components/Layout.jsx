import Content from "./Content";
import Header from "./Header";
import styles from "./layout.module.css";

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <Content />
    </div>
  );
}

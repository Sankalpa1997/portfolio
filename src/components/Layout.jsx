import React from "react";
import Content from "./Content";
import Header from "./Header";
import MouseGradient from "./MouseGradient";
import styles from "./layout.module.css";

export default function Layout() {
  return (
    <div className={styles.fullScreenContainer}>
      <MouseGradient />
      <div className={styles.layout}>
        <Header />
        <Content />
      </div>
    </div>
  );
}

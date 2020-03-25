import React from "react";
import styles from "./topBar.module.scss";
import Hamburger from "./hamburger/hamburger";

interface topBarProps extends React.Props<any> {
  pageTitle: string;
}

const TopBar: React.FC<topBarProps> = ({ pageTitle }) => {
  return (
    <div className={styles.wrapper}>
      <Hamburger />
      <a className={styles.title}>{pageTitle}</a>
    </div>
  );
};

export default TopBar;

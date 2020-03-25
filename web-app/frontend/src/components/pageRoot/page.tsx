import React from "react";
import TopBar from "../topbar/topBar";
import PageContent from "../pageContent/pageContent";
import styles from "./page.module.scss";

const Page: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <TopBar pageTitle="JVP Waveform Analyzer" />
      <PageContent />
    </div>
  );
};

export default Page;

import React, { useState } from "react";
import SideBar from "./sideBar/sideBar";
import styles from "./pageContent.module.scss";
import DataCollection from "../../pages/dataColleciton/dataCollection";
import History from "../../pages/history/history";

export const pages = {
  history: "history",
  dataCapture: "dataCapture"
};

const PageContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<any | any>(pages.dataCapture);

  const getCurrentPage = () => {
    switch (currentPage) {
      case pages.dataCapture:
        return <DataCollection />;
      case pages.history:
        return <History />;
      default:
        throw new Error("Unknown Page State");
    }
  };

  return (
    <div className={styles.wrapper}>
      <SideBar router={setCurrentPage} currentPage={currentPage} />
      {getCurrentPage()}
    </div>
  );
};

export default PageContent;

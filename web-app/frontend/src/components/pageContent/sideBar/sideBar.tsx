import React from "react";
import styles from "./sideBar.module.scss";
import typedUseSelector from "../../../redux/reduxInterfaces";
import SideBarButton from "../sideBarButton/sideBarButton";
import classNames from "classnames";
import { pages } from "../pageContent";

interface SideBarProps extends React.Props<any> {
  router: any;
  currentPage: string;
}

const SideBar: React.FC<SideBarProps> = ({ router, currentPage }) => {
  const display = typedUseSelector(
    (state: { displaySideBar: boolean }) => state.displaySideBar
  );

  const historyOrDataCapture = {
    text: currentPage === pages.dataCapture ? "History" : "Collect Data",
    onClick: () => {
      router(
        currentPage === pages.dataCapture ? pages.history : pages.dataCapture
      );
    }
  };

  return (
    <div className={classNames(styles.wrapper, display ? null : styles.hidden)}>
      <SideBarButton
        text={historyOrDataCapture.text}
        onClick={historyOrDataCapture.onClick}
      />
      <SideBarButton text="Save Data" onClick={() => {}} />
      <SideBarButton text="Generate CSV" onClick={() => {}} />
      <SideBarButton text="Help" onClick={() => {}} />
    </div>
  );
};

export default SideBar;

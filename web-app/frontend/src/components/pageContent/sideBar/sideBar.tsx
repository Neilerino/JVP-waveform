import React from "react";
import styles from "./sideBar.module.scss";
import typedUseSelector from "../../../redux/reduxInterfaces";
import SideBarButton from "../sideBarButton/sideBarButton";
import classNames from "classnames";
import { pages } from "../pageContent";
import { tourSelectors } from "../../../helpTour";

interface SideBarProps extends React.Props<any> {
  router: any;
  currentPage: string;
  launchTour: any;
}

const SideBar: React.FC<SideBarProps> = ({
  router,
  currentPage,
  launchTour
}) => {
  const display = typedUseSelector(
    (state: { displaySideBar: boolean }) => state.displaySideBar
  );

  const historyOrDataCapture = {
    text: currentPage === pages.dataCapture ? "History" : "Collect Data",
    onClick: () => {
      router(
        currentPage === pages.dataCapture ? pages.history : pages.dataCapture
      );
    },
    tourSelector: pages.dataCapture
      ? tourSelectors.history
      : tourSelectors.dataCollection
  };

  return (
    <div className={classNames(styles.wrapper, display ? null : styles.hidden)}>
      <SideBarButton
        text={historyOrDataCapture.text}
        onClick={historyOrDataCapture.onClick}
        tourSelector={tourSelectors.history}
      />
      <SideBarButton
        tourSelector={tourSelectors.saveData}
        text="Save Data"
        onClick={() => {}}
      />
      <SideBarButton
        text="Generate CSV"
        onClick={() => {}}
        tourSelector={tourSelectors.generateCsv}
      />
      <SideBarButton text="Help" onClick={launchTour} />
    </div>
  );
};

export default SideBar;

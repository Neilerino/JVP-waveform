// TODO: Code Button functionalities
import React from "react";
import styles from "./sideBarButton.module.scss";

interface SideBarButtonProps extends React.Props<any> {
  text: string;
  onClick: any;
  tourSelector?: string;
}

const SideBarButton: React.FC<SideBarButtonProps> = ({
  text,
  onClick,
  tourSelector = ""
}) => {
  return (
    <div onClick={onClick} className={styles.button} data-tut={tourSelector}>
      {text}
    </div>
  );
};

export default SideBarButton;

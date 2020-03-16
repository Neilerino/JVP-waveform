// TODO: Code Button functionalities
import React from "react";
import styles from "./sideBarButton.module.scss";

interface SideBarButtonProps extends React.Props<any> {
  text: string;
  onClick: any;
}

const SideBarButton: React.FC<SideBarButtonProps> = ({ text, onClick }) => {
  return (
    <div onClick={onClick} className={styles.button}>
      {text}
    </div>
  );
};

export default SideBarButton;

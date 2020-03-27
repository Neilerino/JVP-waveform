import React from "react";
import styles from "./card.module.scss";

interface PropTypes {
  title: string;
  id: number;
  handleClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const Card: React.FC<PropTypes> = ({ title, id, handleClick }) => {
  return (
    <div className={styles.card} onClick={handleClick}>
      {title}
    </div>
  );
};

export default Card;

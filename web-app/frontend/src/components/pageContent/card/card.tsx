import React from "react";
import styles from "./card.module.scss";

interface PropTypes {
  title: string;
  id: number;
  handleClick?: (event: MouseEvent) => void;
}

const Card: React.FC<PropTypes> = ({ title, id, handleClick }) => {
  return <div className={styles.card}>{title}</div>;
};

export default Card;

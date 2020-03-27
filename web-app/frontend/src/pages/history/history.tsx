import React, { useState, useEffect } from "react";
import styles from "./history.module.scss";
import Card from "../../components/pageContent/card/card";
import Plot from "react-plotly.js";
import typedUseSelector from "../../redux/reduxInterfaces";
import TitleBox from "../../components/pageContent/titleBox/titleBox";
import { makePlotlyLayout } from "../dataColleciton/dataCollection";

const History: React.FC = () => {
  const [state, updateState] = useState([0]);

  const getData = async () => {
    const responseData = await fetch("http://localhost:4000/history/GET/ids", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
    updateState(responseData);
  };

  useEffect(() => {
    getData();
  }, []);

  const graphData = typedUseSelector(
    (state: { graphData: any }) => state.graphData
  );

  return (
    <>
      <Plot
        data={[graphData]}
        layout={makePlotlyLayout(
          "Jugular Venous Pressure Information",
          graphData.x.length
        )}
        revision={graphData.x.length}
        config={{ scrollZoom: true }}
      />
      <div className={styles.cardContainer}>
        <TitleBox text="Past Collections" />
        {state.map(value => {
          return <Card title={"Sample Data Set" + value} id={value} />;
        })}
      </div>
    </>
  );
};

export default History;

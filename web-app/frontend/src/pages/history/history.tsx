import React, { useState, useEffect } from "react";
import styles from "./history.module.scss";
import Card from "../../components/pageContent/card/card";
import Plot from "react-plotly.js";
import typedUseSelector from "../../redux/reduxInterfaces";
import TitleBox from "../../components/pageContent/titleBox/titleBox";
import { makePlotlyLayout } from "../dataColleciton/dataCollection";
import { PlotData } from "plotly.js";

const initialGraphState = () => {
  return {
    x: [new Date().toTimeString().split(" ")[0]],
    y: [0],
    type: "scatter"
  };
};

const bundleGraph = (graphObject: object[]) => {
  let graph = {
    x: [],
    y: [],
    type: "scatter"
  };
  graphObject.forEach((dataPoint: any) => {
    graph = {
      ...graph,
      x: graph.x.concat(dataPoint.x),
      y: graph.y.concat(dataPoint.y)
    };
  });
  return graph;
};

const History: React.FC = () => {
  const [cardIds, updateIds] = useState([0]);

  const [graphData, updateGraph] = useState(initialGraphState() as any);

  const getCardData = async () => {
    const responseData = await fetch("http://localhost:4000/history/GET/ids", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
    updateIds(responseData);
  };

  const handleCardClick = async (id: number) => {
    const cardData = await fetch(
      `http://localhost:4000/history/GET/${id}/data`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then(response => response.json());
    const graph = bundleGraph(cardData);
    updateGraph(graph);
  };

  useEffect(() => {
    getCardData();
  }, []);

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
        {cardIds.map(value => {
          return (
            <Card
              title={"Sample Data Set" + value}
              id={value}
              handleClick={() => handleCardClick(value)}
            />
          );
        })}
      </div>
    </>
  );
};

export default History;

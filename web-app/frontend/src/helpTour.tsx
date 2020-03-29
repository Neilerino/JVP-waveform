import React from "react";

export const tourSelectors = {
  frequency: "frequency",
  timer: "timer",
  potentiometer: "potentiometer",
  movingAverage: "movingAverage",
  generateCsv: "generateCsv",
  saveData: "saveData",
  history: "history",
  dataCollection: "dataCollection",
  pastCollections: "pastCollections"
};

const tourConfig = [
  {
    selector: `[data-tut=${tourSelectors.timer}]`,
    content: `Start and stop data collection from this panel`
  },
  {
    selector: `[data-tut=${tourSelectors.frequency}]`,
    content: `Modify the sampling frequency from this panel`
  },
  {
    selector: `[data-tut=${tourSelectors.potentiometer}]`,
    content: `Modify the gain of the device from this panel`
  },
  {
    selector: `[data-tut=${tourSelectors.movingAverage}]`,
    content: `Enable or disable the moving average filter and the filter's width from this panel`
  },
  {
    selector: `[data-tut=${tourSelectors.generateCsv}]`,
    content: `Click this button to generate a CSV file of the current graph data`
  },
  {
    selector: `[data-tut=${tourSelectors.saveData}]`,
    content: `Click this button to save the current recording to view it later on`
  },
  {
    selector: `[data-tut=${tourSelectors.history}]`,
    content: `Click this button to view previously saved data collections`
  }
];

export default tourConfig;

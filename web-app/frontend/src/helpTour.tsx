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
    selector: `[data-tut=${tourSelectors.frequency}]`,
    content: ``
  },
  {
    selector: `[data-tut=${tourSelectors.timer}]`,
    content: ``
  },
  {
    selector: `[data-tut=${tourSelectors.potentiometer}]`,
    content: ``
  },
  {
    selector: `[data-tut=${tourSelectors.movingAverage}]`,
    content: ``
  },
  {
    selector: `[data-tut=${tourSelectors.generateCsv}]`,
    content: ``
  },
  {
    selector: `[data-tut=${tourSelectors.generateCsv}]`,
    content: ``
  },
  {
    selector: `[data-tut=${tourSelectors.saveData}]`,
    content: ``
  },
  {
    selector: `[data-tut=${tourSelectors.dataCollection}]`,
    content: ``
  },
  {
    selector: `[data-tut=${tourSelectors.history}]`,
    content: ""
  },
  {
    selector: `[data-tut=${tourSelectors.pastCollections}]`,
    content: ``
  }
];

export default tourConfig;

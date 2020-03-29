import React, { useEffect } from "react";
import Page from "./components/pageRoot/page";
import openSocket from "socket.io-client";
import { updateGraphData } from "./redux/actions/graphActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

const socket = openSocket("http://localhost:4000");

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Sockets connected");
      fetch("http://localhost:4000/initilize/db", {
        method: "GET",
        mode: "no-cors"
      });
    });

    socket.on("message", (data: string) => {
      dispatch(updateGraphData(JSON.parse(data)));
    });

    return () => {
      socket.off("connect");
      socket.off("message");
    };
  }, []);

  return (
    <>
      <Page />
      <ToastContainer />
    </>
  );
};

export default App;

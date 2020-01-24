import React, { useEffect } from 'react';
import Page from './components/pageRoot/page';
import openSocket from 'socket.io-client';
import updateGraphData from './redux/actions/graphActions';
import { useDispatch } from 'react-redux';

const socket = openSocket('http://localhost:4000');

const App: React.FC = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Sockets connected');
    });

    socket.on('message', (data: string) => {
      console.log('Message Recieved');
      const graphData = JSON.parse(data);
      dispatch(updateGraphData({value: graphData.value, time: graphData.time}));
    });
  });

  return (
    <Page />
  );
}

export default App;

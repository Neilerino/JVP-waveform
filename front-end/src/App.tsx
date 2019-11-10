import React, { useEffect } from 'react';
import Page from './components/pageRoot/page';
import openSocket from 'socket.io-client';
import updateGraphData from './redux/actions/graphActions';

const socket = openSocket('http://localhost:4000');

const App: React.FC = () => {

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Sockets connected');
      updateGraphData({ value: 1, time: 1 });
    })
  });

  return (
    <Page />
  );
}

export default App;

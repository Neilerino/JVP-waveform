import React, { useEffect } from 'react';
import Page from './components/pageRoot/page';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:4000');

const App: React.FC = () => {

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Sockets connected');
    })
  });

  return (
    <Page />
  );
}

export default App;

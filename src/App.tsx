import React from 'react';
import './App.scss';

import Header from './components/shared/Header';
import Temperature from './components/temperature/Temperature';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header/>
      
      <Temperature/>
    </div>
  );
}

export default App;

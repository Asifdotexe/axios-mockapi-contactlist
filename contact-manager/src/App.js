import './App.css';
import React from 'react';
import GetContact from './components/GetContact';
import PPD from './components/PPDContact';

export const UserContext = React.createContext()

function App() {
  return (
    <div className="App">
      <GetContact/>
      <PPD/>
    </div>
  );
}

export default App;

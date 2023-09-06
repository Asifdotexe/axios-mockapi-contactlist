import './App.css';
import React from 'react';
import PPD from './components/PPDContact';
import GetContact from './components/GetContact';

export const UserContext = React.createContext()

function App() {
  return (
    <div className="App">
      <PPD/>
      List:
      <GetContact />
    </div>
  );
}

export default App;

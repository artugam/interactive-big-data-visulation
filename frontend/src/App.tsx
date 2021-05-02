import React from 'react';
import './App.css';
import {Checkins} from "./components/checkins/Checkins";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="p-3 text-center">
          <h1 className="mb-3">Checkins datasets visualization</h1>
        </div>
        <Checkins />
      </header>
      <footer className="p-4" style={{color: "white"}}>Artur Pilch - IT Master Degree | University of Rzeszów 2021</footer>
    </div>
  );
}

export default App;

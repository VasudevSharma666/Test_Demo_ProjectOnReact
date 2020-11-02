import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainFile from './MainFile';
import 'bootstrap/dist/css/bootstrap.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainFile />
      </BrowserRouter>
    </div>
  );
}

export default App;

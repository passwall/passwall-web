import React from 'react';
import Menu from './components/Menu';
import Logo from './components/Logo';
import Download from './components/Download';
import Form from './components/Form';
import KeepInMind from './components/KeepInMind';
import './App.css';


function App() {

  return (
    
    <div className="App">
      <div className="Left">
      <div className="Menu">
          <Menu />
        </div>
        <div className="Logo">
          <Logo />
        </div>
        <div className="Download">
          <Download />
        </div>
      </div>
      <div className="Right">
        <div className="Top">
          <div className="SignupForm">
            <p>PRO will be here soon, until then</p>
            <h2>Create a free account</h2>
            <Form />
          </div>
        </div>
        <div className="Bottom">
          <KeepInMind />
        </div>
      </div>
    </div>
  );
}

export default App;
import React from 'react';
import Menu from './components/Menu';
import Logo from './components/Logo';
import Download from './components/Download';
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
      <div className="Right">,
      </div>
    </div>
  );
}

export default App;

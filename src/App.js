import React, { useState } from 'react';
import Menu from './components/Menu';
import Logo from './components/Logo';
import Download from './components/Download';
import Form from './components/Form';
import Hamburger from './components/Hamburger';
// import Paddle from './components/Paddle';
import './App.css';


function App() {

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen)
    }

    return (

        <div className="App">
            <div className="Left">
                <Menu
                    menuOpen={hamburgerOpen}
                />
                <div className="Logo">
                    <Logo />
                </div>
                <Hamburger
                    toggleHamb={toggleHamburger}
                    hamburgerOpen={hamburgerOpen}
                    setHamburgerOpen={setHamburgerOpen}
                />
                <div className="Download">
                    <Download
                        name="MacOS"
                        url="https://passwall.io/download/passwall-macos/"
                    />
                </div>
            </div>

            <div className="Right">
                <Form />
            </div>
        </div>
    );
}

export default App;
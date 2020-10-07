import React from 'react';

const Hamburger = ({
    toggleHamb,
    hamburgerOpen
}) => {

    const hamburgerClasses = [`Hamburger`, `${hamburgerOpen ? 'Hamburger-open' : ''}`]

    return (
        <div onClick={toggleHamb} className={hamburgerClasses.join(" ")}>
            <div className="Hamburger-Line" />
            <div className="Hamburger-Line" />
            <div className="Hamburger-Line" />
        </div>
    )
}

export default Hamburger;
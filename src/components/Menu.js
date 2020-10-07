import React from 'react';

const Menu = ({
    menuOpen
}) => {
    const links = Array (
        {name: "Give Feedback", url: "https://passwall.typeform.com/to/GAv1h2"},
        {name: "Contact", url: "https://passwall.typeform.com/to/b2un6b"},
        {name: "Community", url: "https://passwall.slack.com/"},
        {name: "Twitter", url: "https://twitter.com/pass_wall"},
    ).map((item, index) => {
        return <a key={index} href={item.url}>{item.name}</a>;
    });

    const menuClasses = [`Menu`, `${menuOpen ? 'Menu-Open' : ''}`];

    return (
        <div className={menuClasses.join(" ")}>
            {links}
        </div>
    )
}

export default Menu;
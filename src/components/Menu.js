import React from 'react';
 
function Menu() {
    const links = Array (
        {name: "Give Feedback", url: "https://www.yakuter.com"},
        {name: "Contact", url: "https://www.yakuter.com"},
        {name: "Community", url: "https://www.yakuter.com"},
        {name: "Twitter", url: "https://twitter.com/pass_wall"},
    );
 
    return links.map((item, index) => {
        return <a key={index} href={item.url}>{item.name}</a>
    });
}
 
export default Menu;
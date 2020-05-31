import React from 'react';
 
function Menu() {
    const links = Array (
        {name: "Give Feedback", url: "https://passwall.typeform.com/to/GAv1h2"},
        {name: "Contact", url: "https://passwall.typeform.com/to/b2un6b"},
        {name: "Community", url: "https://passwall.slack.com/"},
        {name: "Twitter", url: "https://twitter.com/pass_wall"},
    );
 
    return links.map((item, index) => {
        return <a key={index} href={item.url}>{item.name}</a>
    });
}
 
export default Menu;
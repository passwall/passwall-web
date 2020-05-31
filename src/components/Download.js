import React from 'react';
 
function Download() {
    const apps = Array (
        {name: "MacOS", url: "https://passwall.io/download/passwall-macos/"},
    );
 
    return apps.map((item, index) => {
        return <a key={index} href={item.url} className="platform">{item.name}</a>
    });
}
 
export default Download;
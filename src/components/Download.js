import React from 'react';
 
function Download() {
    const apps = Array (
        {name: "MacOS", url: "https://www.yakuter.com"},
    );
 
    return apps.map((item, index) => {
        return <a key={index} href={item.url}>{item.name}</a>
    });
}
 
export default Download;
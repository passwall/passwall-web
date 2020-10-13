import React from 'react';

const Download = ({
    name="MacOS",
    url="https://passwall.io/download/passwall-macos/"
}) => {
    const apps = Array (
        {name: name, url: url},
    );

    return apps.map((item, index) => {
        return <a key={index} href={item.url} className="platform">{item.name}</a>
    });
}

export default Download;
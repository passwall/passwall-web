import React from 'react';
 
function ComingSoon() {
    const apps = Array (
        {value: "Chrome"},
        {value: "Safari"},
        {value: "Firefox"},
        {value: "iOS"},
        {value: "Android"},
        {value: "Windows"},
        {value: "Linux"},
    );
 
    return apps.map((item, index) => {
        return <button key={index} className="coming">{item.value}</button>
    });
}
 
export default ComingSoon;
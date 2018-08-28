import React from 'react';
import './style.css';

export default function Loader(props) {
    return (
        <div className='loader'>
            <div className="lds-ring-default"><div></div><div></div><div></div><div></div></div>
        </div>
    );
}
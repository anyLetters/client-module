import React, { Component } from 'react';
import './style.css';
import './media.css';

export default function Block({rows, title, customContent = null}) {

    if (!rows && !customContent) return null;

    return (
        <div className='block'>
            <h4 className='block-title'>{title}</h4>
            {rows && rows.map((row, i) => {
                return (
                    <div key={i} className='block-row'>
                        {row.map((col, j) => {
                            return (
                                <div key={j} className="block-row-col">
                                    {col.top && <div className={(col.style || {}).top ? col.style.top : ''}>{col.top}</div>}
                                    {col.bottom && <div className={(col.style || {}).bottom ? col.style.bottom : ''}>{col.bottom}</div>}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
            {customContent && customContent()}
        </div>
    )
}

// Row example
// [
//     [                                                first row
//         { top: 'foo', bottom: 'bar', style: obj },   first col
//         { top: 'bar', bottom: 'foo', style: obj },   second col
//         ...                                          etc.
//     ], 
//     [                                                second row
//         { top: 'foo', bottom: 'bar', style: obj },   first col
//         { top: 'bar', bottom: 'foo', style: obj },   second col
//         ...                                          etc.
//     ],
//     ...                                              etc
// ]
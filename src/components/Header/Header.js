import React, { Component } from 'react';
import close from '../../images/close.svg';
import { Link } from 'react-router-dom';
import './style.css';

export default function Header({title, page, back}) {
    let rightSide, leftSide;
    switch(page) {
        case 'application':
            leftSide = (
                <h2>
                    {title}
                </h2>
            );
            break;
        case 'loan':
            leftSide = (
                <h2>
                    {title}
                </h2>
            );
            break;
        case 'pay':	
            rightSide = (	
                <img src={close} onClick={back} alt="назад"/>	
            );	
            leftSide = (	
                <p>{title}</p>	
            );	
            break;
        default:
    }

    return (
        <div className='header'>
            {page !== 'pay' && <div className='header-top'>
                <Link className='blue' to='/borrower'>Назад</Link>
            </div>}
            <div className='header-bottom'>
                <div className="header-leftside">
                    {leftSide}
                </div>
                <div className="header-rightside">
                    {rightSide}
                </div>
            </div>
        </div>
    );
}
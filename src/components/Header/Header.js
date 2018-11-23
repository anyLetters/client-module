import React, { Component } from 'react';
import close from '../../images/close.svg';
import { Link } from 'react-router-dom';
// import back from '../../images/back.svg';
import './style.css';

export default class Header extends Component {
    render() {
        const { title, page } = this.props;
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
            default:
        }

        return (
            <div className='header'>
                <div className='header-top'>
                    <Link className='blue' to='/'>Назад</Link>
                </div>
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
}
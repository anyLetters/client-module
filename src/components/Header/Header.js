import React, { Component } from 'react';
import close from '../../images/close.svg';
import { Link } from 'react-router-dom';
import './style.css';

export default class Header extends Component {
    render() {
        const { title, page } = this.props;
        let element;
        switch(page) {
            case 'applications':
                element = <Link className='blue' to='/new_application'>Взять займ</Link>;
                break;
            case 'pay':
                element = <img src={close} alt=""/>;
                break;
        }

        return (
            <div className='header'>
                <div className="header-leftside">
                    <h2>{this.props.title}</h2>
                </div>
                <div className="header-rightside">
                    {/* <img src={close} alt=""/> */}
                    {element}
                </div>
            </div>
        );
    }
}
import React, { Component } from 'react';
import close from '../../images/close.svg';
import { Link } from 'react-router-dom';
import back from '../../images/back.svg';
import './style.css';

export default class Header extends Component {
    render() {
        const { title, page } = this.props;
        let elementR, elementL;
        switch(page) {
            // case 'loans':
            //     element = <Link className='blue' to='/new_application'>Взять займ</Link>;
            //     break;
            case 'loan':
                elementL = <img src={back} onClick={this.props.back} alt="назад"/>;
                break;
            case 'pay':
                elementR = <img src={close} onClick={this.props.back} alt="назад"/>;
                break;
            // case 'new-app':
            //     element = <img src={close} onClick={this.props.back} alt=""/>;
            default:
        }

        return (
            <div className='header'>
                <div className="header-leftside">
                    <h2>{elementL}{this.props.title}</h2>
                </div>
                <div className="header-rightside">
                    {/* <img src={close} alt="выйти"/> */}
                    {elementR}
                </div>
            </div>
        );
    }
}
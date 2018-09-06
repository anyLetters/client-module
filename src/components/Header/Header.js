import React, { Component } from 'react';
import close from '../../images/close.svg';
import { Link } from 'react-router-dom';
import back from '../../images/back.svg';
import './style.css';

export default class Header extends Component {
    render() {
        const { title, page } = this.props;
        let rightSide, leftSide;
        switch(page) {
            // case 'loans':
            //     element = <Link className='blue' to='/new_application'>Взять займ</Link>;
            //     break;
            case 'application':
                leftSide = (
                    <h2>
                        <img src={back} onClick={this.props.back} alt="назад"/>
                        {this.props.title}
                    </h2>
                );
                break;
            case 'loan':
                leftSide = (
                    <h2>
                        <img src={back} onClick={this.props.back} alt="назад"/>
                        {this.props.title}
                    </h2>
                );
                break;
            case 'pay':
                rightSide = (
                    <img src={close} onClick={this.props.back} alt="назад"/>
                );
                leftSide = (
                    <p>{title}</p>
                );
                break;
            // case 'new-app':
            //     element = <img src={close} onClick={this.props.back} alt=""/>;
            default:
        }

        return (
            <div className='header'>
                <div className="header-leftside">
                    {leftSide}
                </div>
                <div className="header-rightside">
                    {rightSide}
                </div>
            </div>
        );
    }
}
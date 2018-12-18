import React, { Component } from 'react';

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        e.preventDefault();
        this.props.data? this.props.handleClick(this.props.data) : this.props.handleClick();
    }
    render() {
        
        // if (this.props.isTheAuthor) {
        //     isTheAuthor = this.props.isTheAuthor;
        //     console.log('isTheAuthor button');
            
        // }
        const className = this.props.className + ' btn btn-sm';
        return (
            <button className={className}
                disabled={ this.props.disable }
                onClick={this.handleClick}>
                { this.props.icon ?
                    (
                        <i aria-label={ this.props.aria }
                        className={this.props.icon}></i>
                    ):(
                        <span>{ this.props.text }</span>
                    )
                }
            </button>
        );
    }
}
import React, { Component } from 'react';

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.data? this.props.handleClick(this.props.data) : this.props.handleClick();
    }
    render() {
        return (
            <div className="btn btn-sm list-links"
                onClick={this.handleClick}>
                { this.props.icon ?
                    (
                        <i aria-label={ this.props.aria }
                        className={this.props.icon}></i>
                    ):(
                        <span>{ this.props.text }</span>
                    )
                }
            </div>
        );
    }
}
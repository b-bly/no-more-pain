import React, { Component } from 'react';

export default class InjuryListItem extends Component {
    //When you pass a parameter to an onClick function, you can't just write it like
    //handleClick(parameter) or react will call it repeatedly.
    //I am externalizing item to avoid using an arrow
    //function, which creates a new function every click
    //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md#protips
    //https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
    handleClick() {
        this.props.handleClick(this.props.injury._id);
    }

    delete() {
        this.props.delete(this.props.injury._id);
    }

    showForm() {
        this.props.showForm(this.props.injury._id);
    }

    render() {
        console.log('injury-list-item props:');
        console.log(this.props);
        return (
    
            <div className="columns">
                <div className="col-4 col-mx-auto">
                    <div className="card">
                        <div className="columns card-bdy">
                            <div className=" col-12 card-title-line"
                                onClick={this.handleClick.bind(this)}
                            >
                                {this.props.injury.title}
                            </div>
                            {this.props.injury.author ? (
                                <div className="col-12 card-line">
                                    Author: {this.props.injury.author.username}
                                </div>
                            )
                                : (
                                    <div className="col-12 card-line">
                                        Author: Anonymous
                            </div>
                                )}

                            {   this.props.injury.author ?(
                            <div>
                            {
                                this.props.username === this.props.injury.author.username &&
                                 (
                                    <div>
                                        <a className="list-links card-line"
                                            onClick={this.showForm.bind(this)}>edit</a>
                                        &nbsp;
                            <a className="list-links"
                                            onClick={this.delete.bind(this)}>delete</a>
                                    </div>
                                )}
                                </div>
                            ) : 
                            <div></div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
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
        const injuryData = {
            injuryId: this.props.injury._id,
            author: this.props.injury.author
        };
        if (window.confirm('Are you sure?')) {
            this.props.delete(injuryData);
        }
    }

    showForm() {
        this.props.showForm(this.props.injury._id);
    }

    render() {
        return (
            <div className="injury-list-item col-mx-auto">
                <div className="card card-opacity padding"
                onClick={this.handleClick.bind(this)}>
                    <div className="flex-column font-size-1">
                        <div className="col-12 dont-break-out pointer title font-size-2 flex">
                            <span className="">{this.props.injury.title}</span>
                        </div>
                        {this.props.injury.author ? (
                            <div className="col-12 dont-break-out">
                                Author: {this.props.injury.author.username}
                            </div>
                        )
                            : (
                                <div className="col-12 dont-break-out">
                                    Author: Anonymous
                            </div>
                            )}

                        {this.props.injury.author ? (
                            <div>
                                {
                                    this.props.user.id === this.props.injury.author.id &&
                                    (
                                        <div>
                                            <a className="btn btn-sm card-line"
                                                onClick={this.showForm.bind(this)}>edit</a>
                                            &nbsp;
                            <a className="btn btn-sm"
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
        );
    }
}
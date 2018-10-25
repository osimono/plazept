import React, {Component} from 'react';

export default class MainCard extends Component {

    render() {
        return (
            <div className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src={this.props.source} alt="Placeholder"/>
                    </figure>
                </div>
                <div className="card-content">
                    <p className="title">
                        {this.props.title}
                    </p>
                    <a className="subtitle" href={this.props.route}>
                        {this.props.subTitle}
                    </a>
                </div>
            </div>
        );

    }
}
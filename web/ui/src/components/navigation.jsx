import React, {Component} from 'react';
import icon from '../assets/icon_28x28.png';

export default class Navigation extends Component {

    render() {
        return (
            <nav className="navbar is-info">
                <div className="container is-fluid">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="/">
                            <img src={icon} alt="cooking" width={28} height={28}/>
                        </a>
                    </div>
                    <div id="navMenu" className="navbar-menu">
                        <div className="navbar-start">
                            <a className="navbar-item" href="admin.html">
                                Home
                            </a>
                            <a className="navbar-item" href="admin.html">
                                Orders
                            </a>
                            <a className="navbar-item" href="admin.html">
                                Payments
                            </a>
                            <a className="navbar-item" href="admin.html">
                                Exceptions
                            </a>
                        </div>

                    </div>
                </div>
            </nav>
        );
    }
}
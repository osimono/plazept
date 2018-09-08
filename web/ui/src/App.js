import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: "something is broken..."
        };
        this.callServer()
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    Server Says: {this.state.message}
                </p>
            </div>
        );
    }

    callServer() {
        let that = this;
        fetch("/something")
            .then(function (response) {
                return response.text();
            })
            .then(function (text) {
                that.setState({
                    message: text
                })
            })
    }
}

export default App;

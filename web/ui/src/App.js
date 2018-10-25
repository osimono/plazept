import React, {Component} from 'react';
import './App.css';
import Navigation from './components/navigation';
import 'bulma/css/bulma.css'
import {Route, Switch} from "react-router-dom";
import Entry from "./components/entry";
import Items from "./components/items";

class App extends Component {

    render() {
        return (
            <div>
                <Navigation/>
                <Switch>
                    <Route exact path='/' component={Entry}/>
                    <Route path='/items' component={Items}/>
                </Switch>
            </div>);
    }
}

export default App;

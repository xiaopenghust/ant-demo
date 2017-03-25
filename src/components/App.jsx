/**
 * Created by 584003 on 2017/3/24.
 */
import React from 'react';
import {render} from 'react-dom';
import { Router, Route, Link, IndexRoute, Redirect, IndexRedirect, hashHistory, browserHistory } from 'react-router';
import NoMatch from './NoMatch.jsx';
import HomeComponent from './home/HomeComponent.jsx';
import './main.scss';
import {Provider} from 'react-redux';
import store from './store/store.js';


class App extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRedirect to="/home"/>
                <Route path="/home" component={HomeComponent}/>
                <Route path="*" component={NoMatch}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));


/**
 * Created by 584003 on 2017/3/24.
 */
import React from 'react';
import {render} from 'react-dom';
import { Router, Route, Link, IndexRoute, Redirect, IndexRedirect, hashHistory, browserHistory } from 'react-router';
import FrameComponent from './frame/FrameComponent.jsx';
import NoMatch from './NoMatch.jsx';
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
                <footer>
                    <Link to="/home">报名</Link>
                    <Link to="/photos">照片墙</Link>
                    <Link to={{pathname:'click',query:{ qhfrom : "home"}, hash:'#user',}}>我的</Link>
                </footer>
                {this.props.children}
            </div>
        )
    }
}

render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRedirect to="/frame"/>
                <Route path="frame" component={FrameComponent} />
                <Route path="*" component={NoMatch}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'))


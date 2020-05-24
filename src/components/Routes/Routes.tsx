import React, {SFC} from 'react';
import {Switch, Route} from 'react-router-dom'
import Login from '../../containers/Login/Login';
import Books from '../../containers/Books/Books';
import Home from '../../containers/Home/Home';

const Routes: SFC = () => {
    return (
        <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/login" component={Login}/>
            <Route path="/books" component={Books}/>
        </Switch>
    );
}

export default Routes;

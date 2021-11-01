import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GroupList from '../group/group-list';
import GroupDetails from '../group/group-details';
import { useAuth } from '../../hooks/useAuth';
import Register from '../user/register';
import Account from '../user/account';

function Main() {

const { authData } = useAuth();

    return (
        <div className='main'>
            {authData && <h3>{authData.user.username}</h3>}
            <Switch>
                <Route exact path ='/'>
                    <GroupList />
                </Route>
                <Route path ='/details/:id'>
                    <GroupDetails />
                </Route>
                <Route path ='/register'>
                    <Register />
                </Route>
                <Route path ='/account'>
                    <Account />
                </Route>
            </Switch>
            
        </div>
    )
};

export default Main;
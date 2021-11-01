import { useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { auth } from '../../services/user-services';
import { useAuth } from '../../hooks/useAuth';
import { Link, useHistory } from 'react-router-dom';
import User from '../user/user';

function Sidebar() {
    const [ username, setUsername] = useState('');
    const [ password, setPassword ] = useState(''); 
    const { authData, setAuth } = useAuth('');
    const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();
        const data = await auth({username, password}) // posting to API to get credentials token and user info
        setAuth(data) // sending user info to context provider
    }

    const logout = () => {
        setAuth(null);
    }

    const account = () => {
        history.push('/account');
    }



    return (
        <div className='sidebar'>
            {!authData ?
                <div>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={1} alignItems='flex-end'>
                            <Grid item>
                                <AccountCircleIcon />
                            </Grid>
                            <Grid item>
                                <TextField label='Username'
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </Grid>
                            <Grid container spacing={1} alignItems='flex-end'>
                                <Grid item>
                                    <VpnKeyIcon />
                                </Grid>
                                <Grid item>
                                <TextField label='Password' type='password'
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Grid>
                            </Grid>
                        </Grid>
                        <Button variant='contained' color='primary' type='submit'>
                            Log in
                        </Button>
                    </form>
                    <Link to={'/register'}>Register here if you don't have an account</Link>
                </div>
            :
                <div>
                    <User user={authData.user} />
                    <Button variant='contained' color='primary' onClick={() => logout()}>
                        Logout
                    </Button>
                    <Button variant='contained' color='primary' onClick={() => account()}>
                        My Account
                    </Button>
                    <br/>
                </div>
            }
        </div>
    )
};

export default Sidebar;
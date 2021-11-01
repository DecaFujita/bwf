import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import { Link, useHistory } from 'react-router-dom';
import { Button, Grid, TextField } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { register } from '../../services/user-services';
import { auth } from '../../services/user-services';

function Register() {

    const { authData, setAuth } = useAuth();
    const history = useHistory();
    const [ username, setUsername] = useState('');
    const [ password, setPassword ] = useState(''); 
    const [ password2, setPassword2 ] = useState(''); 
    const [ email, setEmail ] = useState(''); 

    const passMatch = () => {
        return password === password2; //returns true if passwords match
    }
    const handleSubmit = async e => {
        e.preventDefault();
        if (passMatch()) {
            const regData = await register({username, email, password, profile: {is_premium: false}});
            if (regData) {
                //logging in
                const data = await auth({username, password}) // posting to API to get credentials token and user info
                setAuth(data) // sending user info to context provider
                history.push('/account');
            }
        } else {
            console.log('not ok')
        }
    }
    return (
        <div>
            <Link to={'/'}>Back</Link>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={1} alignItems='flex-end'>
                    <Grid item>
                        <AccountCircleIcon />
                    </Grid>
                    <Grid item>
                        <TextField label='Username' autoComplete="off"
                            onChange={e => setUsername(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems='flex-end'>
                    <Grid item>
                        <AlternateEmailIcon />
                    </Grid>
                    <Grid item>
                        <TextField label='Email' autoComplete="off"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems='flex-end'>
                    <Grid item>
                        <VpnKeyIcon />
                    </Grid>
                    <Grid item>
                        <TextField label='Password' type='password' autoComplete="off"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems='flex-end'>
                    <Grid item>
                        <VpnKeyIcon />
                    </Grid>
                    <Grid item>
                        <TextField label='Repeat password' type='password' autoComplete="off"
                            onChange={e => setPassword2(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Button variant='contained' color='primary' type='submit'>
                    Register
                </Button>
            </form>
        </div>
    )
}

export default Register;
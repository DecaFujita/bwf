import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import { Link, useHistory } from 'react-router-dom';
import { Button, Grid, TextField } from '@material-ui/core';
import { uploadAvatar, changePass } from '../../services/user-services';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { NotificationManager } from 'react-notifications';

function Account() {

    const { authData, setAuth } = useAuth();
    const [image, setImage ] = useState();
    const history = useHistory();
    const [ oldPassword, setOldPassword ] = useState(''); 
    const [ password, setPassword ] = useState(''); 
    const [ password2, setPassword2 ] = useState(''); 

    const passMatch = () => {
        return password === password2; //returns true if passwords match
    }

    const uploadFile = async e => {
        e.preventDefault();
        const uploadData = new FormData();
        uploadData.append('image', image, image.name);

        const uploaded = await uploadAvatar(authData.user.profile.id, uploadData);
        if(uploaded) {
            NotificationManager.success("Image uploaded.");
        } else {
            NotificationManager.error("Uploaded failed");
        }
    }

    const submitChangePass = async e => {
        e.preventDefault()
        if (passMatch()) {
            console.log('old:', oldPassword, 'new:', password, 'new2:', password2)
            const passData = await changePass(
                {old_password: oldPassword, new_password: password },
                authData.user.id,
                authData.token
            );
            if(passData) {
                NotificationManager.success("Password have been changed.");
            }
        } else {
            NotificationManager.warning("Password doesn't match.");
        }
    }

    return (
        <div>
            <Link to={'/'}>Back</Link>
            <h1>Change your picture</h1>
            <form onSubmit={uploadFile}>
                <label>  
                    <p>Upload your avatar</p>              
                    <TextField type='file' onChange={e => setImage(e.target.files[0])}  autoComplete="off"/>
                </label>
                <Button type='submit' variant='contained' color='primary'>Upload file</Button>
            </form>
            <br/>
            <h1>Change your password</h1>
            <form onSubmit={submitChangePass}>
                <Grid container spacing={1} alignItems='flex-end'>
                    <Grid item>
                        <VpnKeyIcon />
                    </Grid>
                    <Grid item>
                        <TextField label='Old password' type='password' autoComplete="off"
                            onChange={e => setOldPassword(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems='flex-end'>
                    <Grid item>
                        <VpnKeyIcon />
                    </Grid>
                    <Grid item>
                        <TextField label='New password' type='password' autoComplete="off"
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
                <Button type='submit' variant='contained' color='primary'>Change password</Button>
            </form>
        </div>
    )
}

export default Account;
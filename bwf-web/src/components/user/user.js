import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    container: {
        width: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
    },
    username: {
        padding: 0,
        margin: 0,
    }
})


export default function User({user}) {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <Avatar src={'http://127.0.0.1:8000'+user.profile.image} alt='user avatar' />
            <h4 className={classes.username}>{user.username}</h4>
        </div>
    )
};

User.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        profile: PropTypes.shape({
            image: PropTypes.string
        })
    }).isRequired
 }
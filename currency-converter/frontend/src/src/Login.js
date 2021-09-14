import { Button, TextField, Grid } from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

const Login = ({ setToken }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const guestToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI5MWM0ZGVlMjYzMDI5MjgxMmExNmEiLCJpYXQiOjE2MjM4Mzg5NjB9.cs-NbwjWXzzeV8Xkf_MD1AZknZroK5u4thKzSluSqX4';

  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    e.preventDefault();
    setPass(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (e.target.id === 'guest') {
      setToken(guestToken);
      sessionStorage.setItem('token', JSON.stringify(guestToken));
      document.location.replace('/main');
    } else {
    
    /*  for local server tests use this url:

      const url = "http://localhost:80/api/user/login"; */


      const url = 'https://inky-thirsty-clutch.glitch.me/api/user/login';

      const data = {
        name: name,
        email: email,
        password: pass,
      };
      axios
        .post(url, data)
        .then((res) => {
          let userToken = res.data;
          if (!userToken) {
            console.log('There was a problem with the user token');
          } else {
            setToken(res.headers['auth-token']);
            sessionStorage.setItem('token', JSON.stringify(userToken));

            document.location.replace('/main');
          }
        })
        .catch((e) => {
          window.alert('Something went wrong, try again please!');
        });
    }
  };

  return (
    <Grid container className='login-container'>
      <Grid item xs={12} sm={9} md={6} lg={4} xl={4}>
        <h2>Login</h2>
        <form method='POST' onSubmit={handleLogin}>
          <TextField
            required
            onChange={handleEmail}
            type='email'
            fullWidth
            variant='outlined'
            label='Email'>
            {' '}
          </TextField>
          <TextField
            required
            onChange={handlePass}
            fullWidth
            variant='outlined'
            type='password'
            label='Password'
            className='login-input'></TextField>
          <Button
            fullWidth
            type='submit'
            id='login-button'
            variant='contained'
            className='login-button'>
            login
          </Button>
          <p>Not a registered member?</p>
          <Link to='/register'>
            <strong>Register here</strong>
          </Link>
          <span> or </span>
          <span id='guest-link' onClick={handleLogin}>
            <strong id='guest'>Visit as a Guest </strong>
            <PermIdentityIcon className='guest-icon' />
          </span>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;

import { TextField, Button, Grid } from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Register = ({ setToken }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

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

  const handleRegister = (e) => {
    e.preventDefault();

    // const url = "http://localhost:80/api/user/register";
    let url = 'https://inky-thirsty-clutch.glitch.me/api/ratios/register';

    const data = {
      name: name,
      email: email,
      password: pass,
    };
    axios
      .post(url, data)
      .then((res) => {
        document.location.replace('/');
      })
      .catch((e) => {
        console.log(e);

        window.alert(`Something went wrong! Please try again! `);
      });
  };

  return (
    <Grid container className='login-container'>
      <Grid item xs={12} sm={9} md={6} lg={4} xl={4}>
        <h2>Register for full access</h2>
        <form method='POST' onSubmit={handleRegister} autoComplete='off'>
          <TextField
            required
            onChange={handleName}
            fullWidth
            variant='outlined'
            label='Username'
            type='text'
            className='login-input'></TextField>
          <TextField
            type='email'
            required
            onChange={handleEmail}
            fullWidth
            variant='outlined'
            label='Email'></TextField>
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
            Register
          </Button>
          <p>Already a member ?</p>
          <strong id='register-text'>
            {' '}
            <Link to='/'>Login</Link>
          </strong>
          <ExitToAppIcon className='login-icon' />
        </form>
      </Grid>
    </Grid>
  );
};

export default Register;

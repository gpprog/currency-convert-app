import { useEffect, useState } from 'react';
import './App.css';
import Converter from './Converter';
import { Button, Typography, Grid, Paper, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Login from './Login';
import Register from './Register';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Modifier from './Modifier';
import AddRates from './AddRates';
import Remover from './Remover';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import axios from 'axios';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import PowerSettingsNewOutlinedIcon from '@material-ui/icons/PowerSettingsNewOutlined';

function App() {
  const [isGuest, setIsGuest] = useState(false);
  const [convertNum, setConvertNum] = useState([Math.floor(new Date().valueOf() * Math.random())]);
  const [token, setToken] = useState(sessionStorage.getItem('token'));

  const [currencies, setCurrencies] = useState(['']);
  // const baseURL = 'http://localhost:80/api/ratios/all';
  const baseURL = 'https://inky-thirsty-clutch.glitch.me/api/ratios/all';

  useEffect(() => {
    const getToken = () => {
      const tokenString = sessionStorage.getItem('token');
      let userToken = JSON.parse(tokenString);
      if (!userToken) {
        userToken = '';
      }
      setToken(userToken);
    };

    // this is function to get currencies from server or from an array in guest login.
    async function getCurrencies() {
      let headers = {
        headers: { 'auth-token': token },
      };

      if (token) {
        const request = await axios.get(baseURL, headers);
        let data = request.data;

        const currenciesArr = data.map((ratios) => {
          return ratios.base;
        });

        currenciesArr && setCurrencies(currenciesArr.sort());
      }
    }

    if (
      token ===
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI5MWM0ZGVlMjYzMDI5MjgxMmExNmEiLCJpYXQiOjE2MjM4Mzg5NjB9.cs-NbwjWXzzeV8Xkf_MD1AZknZroK5u4thKzSluSqX4'
    ) {
      setIsGuest(true);
    }

    getToken();
    getCurrencies();
  }, [token]);

  const handleLogout = () => {
    sessionStorage.clear();
    document.location.replace('/');
  };

  const addConverter = () => {

    if (convertNum.length<10){

    let num = Math.floor(new Date().valueOf() * Math.random());

    let newList = [...convertNum, num];
    setConvertNum(newList);
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginBottom:'100px',
    },
    paper: {
      backgroundColor: '#FBFBF8',
      marginLeft: '5rem',
	    marginRight: '1rem',
      height: 'auto',
      padding: '0.5rem',
    },

    button: {
      fontSize:'1rem',
      backgroundColor: '#db0707',
      color: 'white',
      width: 85,
      margin: 5,
      '&:hover': {
        backgroundColor: '#585858',
        color: '#F5F5F5',
      },
    },
    btn: {
      fontSize:'1rem',
      backgroundColor: '#158574',
      color: 'white',
      width: 85,
      margin: 5,
      '&:hover': {
        backgroundColor: '#0d3d35',
        color: '#F5F5F5',
      },
    },
  }));

  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#158574',
      },
      secondary: {
        main: '#ed1342',
      },
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className='App'>
          <Container maxWidth='md'>
            <Grid item sm={12}>
              <header className='App-header'>
                <Typography className={classes.header} 
                variant='h3' gutterBottom
                 component='h3'
                  color='primary'>
                  CURRENCY
                  <br />
                  CONVERTER
                </Typography>
              </header>
            </Grid>

            <Switch>
              <Route exact path='/'>
                <Login setToken={setToken} />
              </Route>

              <Route path='/main'>
                <div className={classes.root}>
                  <Grid container>
                    <Grid item xs={1} >
                      <Grid container xs={12}>
                        <Grid item>
                          <Button
                            className={classes.button}
                            onClick={handleLogout}
                            variant='contained'>
                            <PowerSettingsNewOutlinedIcon />
                            Exit
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            className={classes.btn}
                            color='primary'
                            variant='contained'
                            onClick={addConverter}>
                            <AddCircleOutlineIcon /> More
                          </Button>
                        </Grid>
                        <Grid item>
                          <Modifier isGuest={isGuest} token={token} currencies={currencies} />
                        </Grid>
                        <Grid item>
                          <AddRates isGuest={isGuest} token={token} currencies={currencies} />
                        </Grid>
                        <Grid item>
                          <Remover isGuest={isGuest} token={token} currencies={currencies} />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={11}>
                      <Paper variant='outlined' className={classes.paper}>
                        {convertNum.map((num, index) => (
                          <Converter
                            token={token}
                            key={num}
                            currencies={currencies}
                            convertNum={convertNum}
                            setConvertNum={setConvertNum}
                            addConverter={addConverter}
                            id={num}
                          />
                        ))}
                      </Paper>
                    </Grid>
                  </Grid>
                </div>
              </Route>

              <Route path='/register'>
                <Register />
              </Route>
            </Switch>
          </Container>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;

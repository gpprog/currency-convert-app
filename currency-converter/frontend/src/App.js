import { useEffect, useState } from "react";
import "./App.css";
import Converter from "./Converter";
import { Button, Typography } from "@material-ui/core";
import Login from "./Login";
import Register from "./Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Modifier from "./Modifier";
import AddRates from "./AddRates";
import Remover from "./Remover";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import axios from "axios";

function App() {
	
	const [isGuest, setIsGuest] = useState(false);
	const [convertNum, setConvertNum] = useState([
		Math.floor(new Date().valueOf() * Math.random()),
	]);
	const [token, setToken] = useState(sessionStorage.getItem("token"));

	const [currencies, setCurrencies] = useState([""]);
	// const baseURL = 'http://localhost:80/api/ratios/all';
	const baseURL = "https://inky-thirsty-clutch.glitch.me/api/ratios/all";

	
	useEffect(() => {
		
		const getToken = () => {
			const tokenString = sessionStorage.getItem("token");
			let userToken = JSON.parse(tokenString);
			if (!userToken) {
				userToken = "";
			}
			setToken(userToken);
		};

		// this is function to get currencies from server or from an array in guest login.
		async function getCurrencies() {
			let headers = {
				headers: { "auth-token": token },
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
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI5MWM0ZGVlMjYzMDI5MjgxMmExNmEiLCJpYXQiOjE2MjM4Mzg5NjB9.cs-NbwjWXzzeV8Xkf_MD1AZknZroK5u4thKzSluSqX4"
		) {
			setIsGuest(true);
		}

		getToken();
		getCurrencies();
	}, [token]);

	const handleLogout = () => {
		sessionStorage.clear();
		document.location.replace("/");
	};

	const addConverter = () => {
		let num = Math.floor(new Date().valueOf() * Math.random());

		let newList = [...convertNum, num];
		setConvertNum(newList);
	};


	return (
		<Router>
			<div className='App'>
				<header className='App-header'>
					<Typography variant='h3' gutterBottom component='h3' color='primary'>
						CURRENCIES CONVERTER
					</Typography>
				</header>

				<Switch>
					<Route exact path='/'>
						<Login setToken={setToken} />
					</Route>

					<Route path='/main'>
						<div className='buttons-container'>
							<Button
								className='App-logout-button'
								onClick={handleLogout}
								id='App-logout-button'
								variant='contained'>
								Logout
							</Button>
							<Button
								className='App-add-converter'
								color='primary'
								variant='contained'
								onClick={addConverter}>
								<AddCircleOutlineIcon /> More
							</Button>
						</div>
						<div className='crud-buttons-container'>
							<Modifier
								isGuest={isGuest}
								token={token}
								currencies={currencies}
							/>
							<AddRates
								isGuest={isGuest}
								token={token}
								currencies={currencies}
							/>
							<Remover
								isGuest={isGuest}
								token={token}
								currencies={currencies}
							/>
						</div>
						

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



					</Route>

					<Route path='/register'>
						<Register />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;

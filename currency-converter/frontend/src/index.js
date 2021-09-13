import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD13AJdSQxxue8gD0Evwq8CrLdhYxqnTfs",
  authDomain: "currencies-convert.firebaseapp.com",
  projectId: "currencies-convert",
  storageBucket: "currencies-convert.appspot.com",
  messagingSenderId: "25845875844",
  appId: "1:25845875844:web:752d8fa7438141e8322ed1",
  measurementId: "G-5GWKE3XFKR"
};


firebase.initializeApp(firebaseConfig);


ReactDOM.render(
    <App /> ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

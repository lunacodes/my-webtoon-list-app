import React from 'react';
import { Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/js/bootstrap.min.js';
import "./App.css";

import Login from './components/Login/Login';
import UseToken from './components/Login/UseToken';
import NotFoundPage from './components/NotFoundPage';

import Navbar from './components/Navbar';
import UserWebtoonList from './components/Webtoons/User/WebtoonList';
import UserEditWebtoon from './components/Webtoons/User/EditWebtoon';
import UserAddWebtoon from './components/Webtoons/User/AddWebtoon';

function setToken(userToken) {
	sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
	const tokenString = sessionStorage.getItem('token');
	const userToken = JSON.parse(tokenString);
	return userToken?.token;
}

const App = () => {
	const { token, setToken} = UseToken();
	if (! token) {
		console.log("! token");
		return <Login setToken={setToken} />
	}

	return (
	  <div>
	    <Navbar />
	    <div className="container site-inner">
	    <Routes>
		    <Route exact path="/" element={<UserWebtoonList />} />
		    <Route path="/profile" element={<UserWebtoonList />} />
		    <Route path="/edit/:id" element={<UserEditWebtoon />} />
		    <Route path="/add" element={<UserAddWebtoon />} />
		    <Route path="*" element={<NotFoundPage />} />
	    </Routes>
	    </div>
	  </div>
	);
};

export default App;

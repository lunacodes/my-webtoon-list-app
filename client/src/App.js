import React from 'react';
import { Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import Login from './components/Login/Login';
import UseToken from './components/Login/UseToken';
import NotFoundPage from './components/NotFoundPage';

import Navbar from './components/Navbar';
import WebtoonList from './components/WebtoonList';
import EditWebtoon from './components/EditWebtoon';
import AddWebtoon from './components/AddWebtoon';

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
	    <div style={{ margin: 20 }}>
	    <Routes>
		    <Route exact path="/" element={<WebtoonList />} />
		    <Route path="/profile" element={<WebtoonList />} />
		    <Route path="/edit/:id" element={<EditWebtoon />} />
		    <Route path="/add" element={<AddWebtoon />} />
		    <Route path="*" element={<NotFoundPage />} />
	    </Routes>
	    </div>
	  </div>
	);
};

export default App;

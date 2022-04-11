import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.scss';

import Login from './components/Login/Login';
import UseToken from './components/Login/UseToken';
import NotFoundPage from './components/NotFoundPage';

import Navbar from './components/Navbar';
import WebtoonGalleryList from './components/Webtoons/Gallery/WebtoonGalleryList';
import UserWebtoonList from './components/Webtoons/User/WebtoonList';
import UserEditWebtoon from './components/Webtoons/User/EditWebtoon';
import UserAddWebtoon from './components/Webtoons/User/AddWebtoon';
import AddUser from './components/User/AddUser';

function setToken(userToken) {
	sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
	const tokenString = sessionStorage.getItem('token');
	const userToken = JSON.parse(tokenString);
	return userToken?.token;
}

const App = () => {
	const { token, setToken } = UseToken();
	if (window.location.pathname === '/profile' && !token) {
		console.log('! token');
		return <Login setToken={setToken} />;
	}

	return (
		<div>
			<Navbar />
			<main className='container site-inner'>
				<Routes>
					<Route exact path='/' element={<WebtoonGalleryList />} />
					<Route path='/gallery' element={<WebtoonGalleryList />} />
					<Route path='/profile' element={<UserWebtoonList />} />
					<Route path='/edit/:id' element={<UserEditWebtoon />} />
					<Route path='/add' element={<UserAddWebtoon />} />
					<Route path='/signup' element={<AddUser />} />
					<Route path='/login' element={<Login setToken={setToken} />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</main>
		</div>
	);
};

export default App;

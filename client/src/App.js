import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from './context/UserContext';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.scss';

import Welcome from './components/Welcome';
import Login from './components/Login/Login';
import LoginCard from './components/Login/LoginCard';
// import UseToken from './components/Login/UseToken';
import NotFoundPage from './components/NotFoundPage';

import Navbar from './components/Navbar';
import WebtoonGalleryList from './components/Webtoons/Gallery/WebtoonGalleryList';
import UserWebtoonList from './components/Webtoons/User/WebtoonList';
import UserEditWebtoon from './components/Webtoons/User/EditWebtoon';
import UserAddWebtoon from './components/Webtoons/User/AddWebtoon';
import AddUser from './components/User/AddUser';

// function setToken(userToken) {
// 	sessionStorage.setItem('token', JSON.stringify(userToken));
// }
//
// function getToken() {
// 	const tokenString = localStorage.getItem('token');
// 	const userToken = JSON.parse(tokenString);
// 	return userToken?.token;
// }

const App = () => {
	const [userContext, setUserContext] = useContext(UserContext);
	if (!userContext.token) {
		console.log('! token');
		return <LoginCard />;
	}

	return (
		<div>
			<Navbar />
			<main className='container site-inner'>
				{/* <LoginCard /> */}
				<Welcome />;
				<Routes>
					<Route exact path='/' element={<WebtoonGalleryList />} />
					<Route path='/gallery' element={<WebtoonGalleryList />} />
					<Route path='/profile' element={<UserWebtoonList />} />
					<Route path='/edit/:id' element={<UserEditWebtoon />} />
					<Route path='/add' element={<UserAddWebtoon />} />
					<Route path='/signup' element={<AddUser />} />
					<Route path='/login' element={<LoginCard />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</main>
		</div>
	);
};

export default App;

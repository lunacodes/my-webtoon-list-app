import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from './context/UserContext';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Col, Row } from 'reactstrap';
import './App.scss';

import Welcome from './components/Welcome';
import LoginCard from './components/Login/LoginCard';
import Loader from './components/Loader';

import NotFoundPage from './components/NotFoundPage';
import Navbar from './components/Navbar';
import WebtoonGalleryList from './components/Webtoons/Gallery/WebtoonGalleryList';
import UserWebtoonList from './components/Webtoons/User/WebtoonList';
import UserEditWebtoon from './components/Webtoons/User/EditWebtoon';
import UserAddWebtoon from './components/Webtoons/User/AddWebtoon';
import AddUser from './components/User/AddUser';

const App = () => {
	// const [currentTab, setCurrentTab] = useState('login');
	const [userContext, setUserContext] = useContext(UserContext);

	const verifyUser = useCallback(() => {
		fetch(process.env.REACT_APP_API_ENDPOINT + 'users/refreshToken', {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
		}).then(async (response) => {
			if (response.ok) {
				const data = await response.json();
				setUserContext((oldValues) => {
					return { ...oldValues, token: data.token };
				});
			} else {
				setUserContext((oldValues) => {
					return { ...oldValues, token: null };
				});
			}
			// call refreshToken every 5 minutes to renew the authentication token.
			setTimeout(verifyUser, 5 * 60 * 1000);
		});
	}, [setUserContext]);

	useEffect(() => {
		verifyUser();
	}, [verifyUser]);

	/**
	 * Sync logout across tabs
	 */

	const syncLogout = useCallback((event) => {
		if (event.key === 'logout') {
			window.history.push('/');
		}
	}, []);

	useEffect(() => {
		window.addEventListener('storage', syncLogout);

		return () => {
			window.removeEventListner('storage', syncLogout);
		};
	}, [syncLogout]);

	return userContext.token === null ? (
		<main className='container site-inner'>
			<Row>
				<Col sm='6'>
					<LoginCard />
				</Col>
			</Row>
		</main>
	) : userContext.token ? (
		<div>
			<Navbar />
			<main className='container site-inner'>
				<Welcome />
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
	) : (
		<Loader />
	);
};

export default App;

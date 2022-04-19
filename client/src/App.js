import React, { useCallback, useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserContext } from '@Context/UserContext';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Col, Row } from 'reactstrap';
import './App.scss';

import LoginCard from '@Components/Login/LoginCard';
import Loader from '@Components/Loader';

import NotFoundPage from '@Components/NotFoundPage';
import Navbar from '@Components/Navbar';
import WebtoonGalleryList from '@Components/Webtoons/Gallery/WebtoonGalleryList';
import UserWebtoonList from '@Components/Webtoons/User/WebtoonList';
import UserEditWebtoon from '@Components/Webtoons/User/EditWebtoon';
import UserAddWebtoon from '@Components/Webtoons/User/AddWebtoon';
import Register from '@Components/User/Register';

const App = () => {
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
			window.location.reload();
		}
	}, []);

	useEffect(() => {
		window.addEventListener('storage', syncLogout);
		return () => {
			window.removeEventListener('storage', syncLogout);
		};
	}, [syncLogout]);

	return userContext.token === null ? (
		<div>
			{/* <Logout /> */}
			<main className='container site-inner'>
				<Row>
					<Col sm='6'>
						<LoginCard />
					</Col>
				</Row>
			</main>
		</div>
	) : userContext.token ? (
		<div>
			<Navbar />
			<main className='container site-inner'>
				<Routes>
					<Route exact path='/' element={<WebtoonGalleryList />} />
					<Route path='/gallery' element={<WebtoonGalleryList />} />
					<Route path='/profile' element={<UserWebtoonList />} />
					<Route path='/edit/:id' element={<UserEditWebtoon />} />
					<Route path='/add' element={<UserAddWebtoon />} />
					<Route path='/signup' element={<Register />} />
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

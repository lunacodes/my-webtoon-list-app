import { Button, Card } from 'reactstrap';
import React, { useCallback, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import Loader from './Loader';

const Logout = () => {
	const [userContext, setUserContext] = useContext(UserContext);

	const fetchUserDetails = useCallback(() => {
		fetch(process.env.REACT_APP_API_ENDPOINT + 'users/me', {
			method: 'GET',
			credentials: 'include',
			// Pass authentication token as bearer token in header
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userContext.token}`,
			},
		}).then(async (response) => {
			if (response.ok) {
				const data = await response.json();
				setUserContext((oldValues) => {
					return { ...oldValues, details: data };
				});
			} else {
				if (response.status === 401) {
					// Edge case: when the token has expired.
					// This could happen if the refreshToken calls have failed due to network error or
					// User has had the tab open from previous day and tries to click on the Fetch button
					// console.log('Logout.js: 401 Unauthorized');
					localStorage.removeItem('');
					window.location.replace('/');
				} else {
					setUserContext((oldValues) => {
						return { ...oldValues, details: null };
					});
				}
			}
		});
	}, [setUserContext, userContext.token]);

	useEffect(() => {
		// fetch only when user details are not present
		if (!userContext.details) {
			fetchUserDetails();
		}
	}, [userContext.details, fetchUserDetails]);

	const logoutHandler = () => {
		fetch(process.env.REACT_APP_API_ENDPOINT + 'users/logout', {
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userContext.token}`,
			},
		}).then(async (response) => {
			setUserContext((oldValues) => {
				return { ...oldValues, details: undefined, token: null };
			});
			window.localStorage.setItem('logout', Date.now());
		});
	};

	return userContext.details === null ? (
		'Error Loading User details'
	) : !userContext.details ? (
		<Loader />
	) : (
		<Card>
			<div className='user-actions'>
				<Button variant='primary' onClick={logoutHandler}>
					Logout
				</Button>
			</div>
		</Card>
	);
};

export default Logout;

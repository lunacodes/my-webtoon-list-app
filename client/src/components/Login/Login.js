import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

async function loginUser(credentials) {
	return fetch('http://localhost:8080/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		mode: 'cors',
		body: JSON.stringify(credentials),
	}).then((data) => data.json());
}

export default function Login({ setToken }) {
	const [username, setUserName] = useState();
	const [password, setPassword] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = await loginUser({
			username,
			password,
		});
		setToken(token);
	};

	return (
		<div className='login-wrapper'>
			<h1>Please Log In</h1>
			<p>
				<a href='/signup'>Need to register?</a>
			</p>
			<form onSubmit={handleSubmit}>
				<label>
					<p>Username</p>
					<input
						type='text'
						onChange={(e) => setUserName(e.target.value)}
						autoComplete='username'
					/>
				</label>
				<label>
					<p>Password</p>
					<input
						type='password'
						onChange={(e) => setPassword(e.target.value)}
						autoComplete='password'
					/>
				</label>
				<div>
					<button type='submit'>Submit</button>
				</div>
			</form>
		</div>
	);
}

Login.propTypes = {
	setToken: PropTypes.func.isRequired,
};

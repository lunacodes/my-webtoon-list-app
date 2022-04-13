import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import React, { useState } from 'react';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<>
			<Form>
				<FormGroup>
					<Label for='email'>Email</Label>
					<Input
						id='email'
						placeholder='Email'
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label for='password'>Password</Label>
					<Input
						id='password'
						placeholder='Password'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</FormGroup>
				<Button intent='primary' fill type='submit'>
					Sign In
				</Button>
			</Form>
		</>
	);
};

export default Login;

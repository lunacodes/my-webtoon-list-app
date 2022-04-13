import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import React, { useState } from 'react';

const Register = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<>
			<Form className='auth-form'>
				<FormGroup>
					<Label for='firstName'>First Name</Label>
					<Input
						id='firstName'
						placeholder='First Name'
						onChange={(e) => setFirstName(e.target.value)}
						value={firstName}
					/>
				</FormGroup>
				<FormGroup>
					<Label for='lastName'>Last Name</Label>
					<Input
						id='lastName'
						placeholder='Last Name'
						onChange={(e) => setLastName(e.target.value)}
						value={lastName}
					/>
				</FormGroup>
				<FormGroup>
					<Label for='email'>Email</Label>
					<Input
						id='email'
						type='email'
						placeholder='Email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</FormGroup>
				<FormGroup>
					<Label for='password'>Password</Label>
					<Input
						id='password'
						type='password'
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</FormGroup>
				<Button intent='primary' type='submit' text='Register' fill>
					Submit
				</Button>
			</Form>
		</>
	);
};

export default Register;

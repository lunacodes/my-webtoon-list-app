import React from 'react';

import React, { useState } from "react";
import { useNavigate } from "react-router";
import UserListHeading from '../UserListHeading';
import UserUserEntryForm from './UserEntryForm';

export default function CreateUser() {
	const [form, setForm] = useState({
		title: "",
		score: "",
		progress: "",
		tags: "",
	});
	const navigate = useNavigate();

	// These methods will update the state properties.
	function updateForm(value) {
		return setForm((prev) => {
			return { ...prev, ...value };
		});
	}

	// This function will handle the submission.
	async function onSubmit(e) {
		e.preventDefault();

		// When a post request is sent to the create url, we'll add a new User to the database.
		const newUser = { ...form };

		await fetch("http://localhost:3001/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newUser),
		})
		.catch(error => {
			window.alert(error);
			return;
		});

		setForm({ title: "", score: "", progress: "", tags: "" });
		navigate("/profile");
	}

	return (
		<div>
			<UserListHeading heading="Add a User" />
			<UserUserEntryForm form={form} onSubmit={onSubmit} updateForm={updateForm} />
		</div>
	);
}

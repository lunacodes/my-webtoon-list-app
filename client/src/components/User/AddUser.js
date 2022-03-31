import React, { useState } from "react";
import { useNavigate } from "react-router";
import WebtoonListHeading from '../Webtoons/WebtoonListHeading';
import AddUserForm from './AddUserForm';

export default function UserAddWebtoon() {
	const [form, setForm] = useState({
		name_first: "",
		name_last: "",
		username: "",
		password: "",
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

		// When a post request is sent to the create url, we'll add a new webtoon to the database.
		const newUser = { ...form };

		await fetch("http://localhost:3001/user/add", {
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

		setForm({ name_first: "", name_last: "", username: "", password: "" });
		navigate("/login");
	}

	return (
		<div>
			<WebtoonListHeading heading="Register User" />
			<AddUserForm form={form} onSubmit={onSubmit} updateForm={updateForm} />
		</div>
	);
}

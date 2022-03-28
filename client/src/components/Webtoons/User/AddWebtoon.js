import React, { useState } from "react";
import { useNavigate } from "react-router";
import WebtoonListHeading from '../WebtoonListHeading';
import UserWebtoonEntryForm from './WebtoonEntryForm';

export default function UserAddWebtoon() {
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

		// When a post request is sent to the create url, we'll add a new webtoon to the database.
		const newWebtoon = { ...form };

		await fetch("http://localhost:3001/webtoon/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newWebtoon),
		})
		.catch(error => {
			window.alert(error);
			return;
		});

		setForm({ title: "", score: "", progress: "", tags: "" });
		navigate("/");
	}

	return (
		<div>
			<WebtoonListHeading heading="Add a Webtoon" />
			<UserWebtoonEntryForm form={form} onSubmit={onSubmit} updateForm={updateForm} />
		</div>
	);
}

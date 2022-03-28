import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function AddWebtoon() {
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

	// This following section will display the form that takes the input from the user.
	return (
		<div>
			<h3>Add New Webtoon</h3>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="title">Title</label>
					<input
						type="text"
						className="form-control"
						id="name"
						value={form.title}
						onChange={(e) => updateForm({ title: e.target.value })}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="score">Score</label>
					<input
						type="text"
						className="form-control"
						id="score"
						value={form.score}
						onChange={(e) => updateForm({ score: e.target.value })}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="progress">Progress</label>
					<input
						type="text"
						className="form-control"
						id="progress"
						value={form.progress}
						onChange={(e) => updateForm({ progress: e.target.value })}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="tags">Tags</label>
					<input
						type="text"
						className="form-control"
						id="tags"
						value={form.tags}
						onChange={(e) => updateForm({ tags: e.target.value })}
					/>
				</div>
				<div className="form-group" style={{ margin: '20px 0' }}>
					<input
						type="submit"
						value="Add Webtoon"
						className="btn btn-primary"
					/>
				</div>
			</form>
		</div>
	);
}

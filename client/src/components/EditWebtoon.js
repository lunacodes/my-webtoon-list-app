import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

export default function EditWebtoon() {
	const [form, setForm] = useState({
		title: "",
		score: "",
		progress: "",
		tags: "",
		webtoons: "",
	});

	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			const id = params.id.toString();
			const response = await fetch(`http://localhost:5000/webtoon/${params.id.toString()}`);

			if (! response.ok) {
				const message = `An error has occured: {response.statusText}`;
				window.alert(message);
				return;
			}

			const webtoon = await response.json();
			if (! webtoon) {
				window.alert(`Webtoon with id ${id} not found`);
				navigate('/');
				return;
			}

			setForm(webtoon);
		}

		fetchData();
		return;
	}, [params.id, navigate]);

	function updateForm(value) {
		return setForm((prev) => {
			return { ...prev, ...value };
		});
	}

	async function onSubmit(e) {
		e.preventDefault();
		const editedWebtoon = {
			title: form.title,
			score: form.score,
			progress: form.progress,
			tags: form.tags,
			webtoons: form.webtoons,
		};

		// Send a POST request to update the data in the database
		await fetch(`http://localhost:5000/update/${params.id}`, {
			method: 'POST',
			body: JSON.stringify(editedWebtoon),
			headers: {
				'Content-Type': 'application/json'
			},
		});

		navigate('/');
	}

	// Display the form that takes user input to update the data
	// This seems to be exactly the same as the Add form, except for the title
	// Pretty Sure this can be abstracted into /components/Form.js
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
};

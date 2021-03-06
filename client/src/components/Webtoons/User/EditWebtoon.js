import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import WebtoonListHeading from '@Webtoon_Components/WebtoonListHeading';
import UserWebtoonEntryForm from '@User_Components/WebtoonEntryForm';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function UserEditWebtoon() {
	const [form, setForm] = useState({
		title: '',
		score: '',
		progress: '',
		tags: '',
		webtoons: '',
	});

	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			const id = params.id.toString();
			const response = await fetch(
				`${BASE_URL}/webtoon/${params.id.toString()}`,
				{ mode: 'cors' }
			);

			if (!response.ok) {
				const message = `An error has occured: {response.statusText}`;
				window.alert(message);
				return;
			}

			const webtoon = await response.json();
			if (!webtoon) {
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
		await fetch(`${BASE_URL}/update/${params.id}`, {
			method: 'POST',
			body: JSON.stringify(editedWebtoon),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		navigate('/profile');
	}

	return (
		<div>
			<WebtoonListHeading heading='Edit Webtoon' />
			<UserWebtoonEntryForm
				form={form}
				onSubmit={onSubmit}
				updateForm={updateForm}
				submitText='Update Webtoon'
			/>
		</div>
	);
}

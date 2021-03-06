import React, { useEffect, useState } from 'react';
import WebtoonListHeading from '@Webtoon_Components/WebtoonListHeading';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const FETCH_URL = process.env.REACT_APP_FETCH_ENDPOINT;

const Webtoon = (props) => (
	<div className='image-container'>
		<figure>
			<img src={props.image} alt={props.webtoon.title} />
			<figcaption className='webtoon-title'>{props.webtoon.title}</figcaption>
		</figure>
		<div className='favorites-bar overlay'>
			<span className='mr-2'>Add to Favourites </span>
			<svg
				width='1em'
				height='1em'
				viewBox='0 0 16 16'
				className='bi bi-heart-fill'
				fill='red'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					fillRule='evenodd'
					d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
				/>
			</svg>
		</div>
	</div>
);

export default function WebtoonGalleryList() {
	const [webtoons, setWebtoons] = useState([]);

	useEffect(() => {
		async function getWebtoons() {
			// console.log(`${FETCH_URL}/webtoonGallery`);
			const response = await fetch(`${FETCH_URL}/webtoonGallery`, {
				mode: 'cors',
			});

			if (!response.ok) {
				const message = `An error occured: ${response.statusText}`;
				window.alert(message);
				return;
			}

			const webtoons = await response.json();
			setWebtoons(webtoons);
		}

		getWebtoons();

		return;
	}, [webtoons.length]);

	// This method will delete a webtoon
	async function deleteWebtoon(id) {
		await fetch(`${FETCH_URL}/${id}`, {
			method: 'DELETE',
			mode: 'cors',
		});

		const newWebtoons = webtoons.filter((el) => el._id !== id);
		setWebtoons(newWebtoons);
	}

	// This method will map out the webtoons on the table
	function webtoonList() {
		return webtoons.map((webtoon) => {
			const image = `${BASE_URL}/img/${webtoon.titleForSeo}.jpg`;
			return (
				<Webtoon
					webtoon={webtoon}
					image={image}
					deleteWebtoon={() => deleteWebtoon(webtoon._id)}
					key={webtoon._id}
				/>
			);
		});
	}

	// This following section will display the table with the webtoons of individuals.
	return (
		<div className='webtoon-list-title-bar'>
			<WebtoonListHeading heading='Webtoons' />
			<a className='add-webtoon' href='/add'>
				Add Webtoon
			</a>
			<div className='webtoon-main-gallery'>{webtoonList()}</div>
		</div>
	);
}

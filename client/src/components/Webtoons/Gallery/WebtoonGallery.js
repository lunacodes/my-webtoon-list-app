// 'use strict';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WebtoonGalleryList from './WebtoonGalleryList';
import SearchBox from './SearchBox';
import AddGalleryWebtoon from './AddGalleryWebtoon';
import WebtoonGalleryHeading from './WebtoonGalleryHeading';

const WebtoonGallery = () => {
	const [webtoons, setWebtoons] = useState([]);
	const [{searchValue, setSearchValue}] = useState('');
	const [myWebtoons, setMyWebtoons] = useState([]);

	/* Axios code commented out, until it's replaced with a local API */
	// var options = {
	// 	method: 'GET',
	// 	url: 'https://webtoon.p.rapidapi.com/canvas/search',
	// 	params: {
	// 		query: searchValue,
	// 		genre: 'ALL',
	// 		sortOrder: 'READ_COUNT',
	// 		startIndex: '0',
	// 		pageSize: '20',
	// 		language: 'en'
	// 	},
	// 	headers: {
	// 		'x-rapidapi-host': 'webtoon.p.rapidapi.com',
	// 		'x-rapidapi-key': '929a8b1073msh7b5fcc165787671p1bc5f8jsnfd87eef03499'
	// 	}
	// };

	// axios.request(options).then((response) => {
	// 	let titles = response.data.message.result.challengeSearch.titleList;

	// 	let title_list = [];
	// 	titles.forEach( entry => {
	// 		title_list.push(entry.title + '\n');
	// 	});

	// 	setWebtoons(titles);
	// });

	return(
		<div>
			{/*<WebtoonGalleryList />*/}
			<SearchBox />
			<WebtoonGalleryHeading />
			<AddGalleryWebtoon />
			<p>This is will soon become the main gallery. For now, please visit the<a href="/profile">Profile page</a>, for the normal User Webtoons View.</p>
		</div>
	);
};

export default WebtoonGallery;

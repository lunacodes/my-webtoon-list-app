// 'use strict';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import WebtoonList from './components/WebtoonList';
import SearchBox from './components/SearchBox';
import AddWebtoon from './components/AddWebtoon';
import WebtoonListHeading from './components/WebtoonListHeading';

const App = () => {
	const [webtoons, setWebtoons] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [myWebtoons, setMyWebtoons] = useState([]);

	const getWebtoonsRequest = async (searchValue) => {
		var options = {
			method: 'GET',
			url: 'https://webtoon.p.rapidapi.com/canvas/search',
			params: {
				query: searchValue,
				genre: 'ALL',
				sortOrder: 'READ_COUNT',
				startIndex: '0',
				pageSize: '20',
				language: 'en'
			},
			headers: {
				'x-rapidapi-host': 'webtoon.p.rapidapi.com',
				'x-rapidapi-key': '929a8b1073msh7b5fcc165787671p1bc5f8jsnfd87eef03499'
			}
		};

		axios.request(options).then((response) => {
			let titles = response.data.message.result.challengeSearch.titleList;

			let title_list = [];
			titles.forEach( entry => {
				title_list.push(entry.title + '\n');
			});

			setWebtoons(titles);
		});
	};

	useEffect(() => {
		getWebtoonsRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const myWebtoonsList = JSON.parse(localStorage.getItem('mwl-app-my-webtoons'));

		setMyWebtoons(myWebtoonsList);
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('mwl-app-my-webtoons', JSON.stringify(items));
	}

	const addMyWebtoon = (webtoon) => {
		const newWebtoonList = [...myWebtoons, webtoon];
		console.log(newWebtoonList);
		saveToLocalStorage(newWebtoonList);
	};

	return (
		<div className='container-fluid movie-app'>
			<WebtoonListHeading heading='Search Results' />
			<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />

			<div className='row'>
				<WebtoonList
					webtoons={webtoons}
					MyWebtoonsComponent={AddWebtoon}
					handleWebtoonsClick={addMyWebtoon}
					/>
				</div>

				<div className='row'>
					<WebtoonListHeading heading='My Webtoons' />
					</div>
		</div>
	);
};

export default App;

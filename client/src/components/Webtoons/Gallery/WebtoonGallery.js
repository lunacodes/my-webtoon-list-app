// 'use strict';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WebtoonGalleryList from './WebtoonGalleryList';
import SearchBox from './SearchBox';
import WebtoonGalleryHeading from './WebtoonGalleryHeading';

const WebtoonGallery = () => {
	const [webtoons, setWebtoons] = useState([]);
	const [{searchValue, setSearchValue}] = useState('');
	const [myWebtoons, setMyWebtoons] = useState([]);

	return(
		<div>
			<WebtoonGalleryHeading heading="Webtoons" />
			<SearchBox />
			<WebtoonGalleryList webtoons={webtoons} />
		</div>
	);
};

export default WebtoonGallery;

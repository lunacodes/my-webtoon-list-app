import React from 'react';

const WebtoonList = (props) => {
	const MyWebtoonsComponent = props.MyWebtoonsComponent;

	return (
		<>
		{props.webtoons.map((webtoon, index) => (

			<div className='image-container d-flex justify-content-start m-3'>
				<div>{webtoon.title} {webtoon.starScoreAverage}</div>
				<MyWebtoonsComponent />
			</div>
		))};
		</>
	);
};

export default WebtoonList;

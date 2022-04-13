import { Spinner } from 'reactstrap';
import React from 'react';

const Loader = () => {
	return (
		<div className='loader'>
			<Spinner color='secondary'>Loading...</Spinner>
		</div>
	);
};

export default Loader;

import { Spinner } from 'reactstrap';
import React from 'react';

const Loader = () => {
	return (
		<div className='loader'>
			<Spinner color='secondary' size='sm'>
				Loading...
			</Spinner>
		</div>
	);
};

export default Loader;

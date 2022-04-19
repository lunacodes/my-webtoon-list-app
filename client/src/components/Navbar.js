import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '@Components/Logout';

const Navbar = () => {
	return (
		<nav
			className='container navbar navbar-expand-lg navbar-light top-nav sticky-top'
			aria-label='main navigation'
		>
			<div className='nav-wrap container-fluid'>
				<NavLink className='navbar-brand' to='/'>
					MyWebtoonList
				</NavLink>
				<button
					className='navbar-toggler navbar-toggler-right ms-auto'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#topNav'
					aria-controls='topNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='topNav'>
					<ul className='nav navbar-nav ms-auto mt-2 mt-lg-0'>
						<li className='nav-item'>
							<Logout />
						</li>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/profile'>
								Profile
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

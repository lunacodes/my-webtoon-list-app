import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '@Auth_Components/Logout';

const HeaderLogo = () => {
	return (
		<nav
			className='container navbar navbar-expand-lg navbar-light top-nav sticky-top'
			aria-label='main navigation'
		>
			<div className='nav-wrap container-fluid'>
				<NavLink className='navbar-brand' to='/'>
					MyWebtoonList
				</NavLink>
			</div>
		</nav>
	);
};

export default HeaderLogo;

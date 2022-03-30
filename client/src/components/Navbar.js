import React from "react";
// import 'bootstrap/dist/js/bootstrap.min.js';

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
	return (
		<nav className="container navbar navbar-expand-lg navbar-light top-nav sticky-top" aria-label="main navigation">
		<div className="nav-wrap container-fluid">
		<NavLink className="navbar-brand" to="/">MyWebtoonList</NavLink>
		<button className="navbar-toggler navbar-toggler-right ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#topNav" aria-controls="topNav" aria-expanded="false" aria-label="Toggle navigation">
		<span className="navbar-toggler-icon"></span>
		</button>
		<div className="collapse navbar-collapse" id="topNav">
		<ul className="nav navbar-nav ms-auto mt-2 mt-lg-0">
		<li className="nav-item">
		<NavLink className="nav-link" to="/profile">Profile</NavLink>
		</li>
		</ul>
		</div>
		</div>
	</nav>
 );
}

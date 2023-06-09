import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SearchBtn from "../components/SearchBtn";

export default function Navbar({
	loggedIn,
	logUserOut,
	posts,
	onlyMine,
	setOnlyMine,
	lastPostIndex,
}) {
	// console.log(props);
	// console.log(typeof props);
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					Pantry Plus!
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavAltMarkup"
					aria-controls="navbarNavAltMarkup"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div className="navbar-nav">
						<Link className="nav-link" to="/">
							Home
						</Link>
						{loggedIn ? (
							<>
								<Link className="nav-link" to="/favorites">
									Favorites
								</Link>

								<Link className="nav-link" to="/me">
									User Info
								</Link>

								<Link className="nav-link" to="/list">
									Edit | Delete
								</Link>

								<Link className="nav-link" to="/" onClick={() => logUserOut()}>
									Log Out
								</Link>
								
								
							</>
						) : (
							<>
								<Link className="nav-link" to="/Signup">
									Sign Up
								</Link>
								<Link className="nav-link" to="/login">
									Log In
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
		

	);
}

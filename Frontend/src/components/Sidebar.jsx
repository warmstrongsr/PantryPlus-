import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({
	page,
	setPage,
	posts,
	onlyMine,
	setOnlyMine,
	lastPostIndex,
	loggedIn,
}) {
	return (
		<>
			<div className="card mt-3">
				<div className="card-header">Page: {page + 1}</div>
				<div className="card-body">
					<div style={{ display: "flex", justifyContent: "center" }}>
						{posts.length >= lastPostIndex ? (
							<button
								className="btn btn-success w-49"
								onClick={() => setPage(page + 1)}
								style={{ width: 530, marginBottom: 10 }}
							>
								Page Up
							</button>
						) : null}
					</div>
					<div style={{ display: "flex", justifyContent: "center" }}>
						{page > 0 ? (
							<button
								className="btn btn-danger w-49"
								onClick={() => setPage(page - 1)}
								style={{ width: 530 }}
							>
								Page Down
							</button>
						) : null}
					</div>{" "}
				</div>
			</div>
			{loggedIn ? (
				<div className="card mt-3">
					<div className="card-body">
						<Link
							to="/user/recipes"
							className="btn btn-success w-100"
							onClick={() => setOnlyMine(!onlyMine)}
						>
							{loggedIn && onlyMine ? "See All Posts" : "See Only My List"}
						</Link>
					</div>
				</div>
			) : null}
		</>
	);
}

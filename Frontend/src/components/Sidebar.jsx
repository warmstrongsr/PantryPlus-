import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({
	page,
	setPage,
	recipes,
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
								style={{ width: 150, marginBottom: 10 }}
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
								style={{ width: 150 }}
							>
								Page Down
							</button>
						) : null}
					</div>{" "}
				</div>
			</div>
		
		</>
	);
}

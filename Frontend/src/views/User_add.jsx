import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost({ loggedIn, flashMessage }) {
	const navigate = useNavigate();

	useEffect(() => {
		if (!loggedIn) {
			flashMessage("You must be logged in to add to favorites", "danger");
			navigate("/login");
		}
	});


	async function handleSubmit(e) {
		e.preventDefault();

		// Get the data from the form
		let user_id = e.target.user_id.value;
		let recipe_id = e.target.recipe_id.value;

		// Get the token from localStorage
		let token = localStorage.getItem("token");

		// Set up the request headers
		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);

		// Set up the request body
		let requestBody = JSON.stringify({ user_id , recipe_id });

		// Make the fetch request
		// let response = await fetch("http://localhost:5000/api/add_favorite", {
		// 	method: "POST",
		// 	headers: myHeaders,
		// 	body: requestBody,
		// });

		let data = await response.json();

		if (data.error) {
			flashMessage(data.error, "danger");
		} else {
			flashMessage(`${data.title} has been created`, "primary");
			navigate("/");
		}
	}

	return (
		<>
			<h3 className="text-center">Create A Post!</h3>
			<form action="" onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						type="text"
						name="title"
						className="form-control my-3"
						placeholder="Enter Title"
					/>
					<textarea
						name="content"
						className="form-control my-3"
						placeholder="Enter Body"
					/>
					<input
						type="submit"
						value="Create Post"
						className="btn btn-success w-100"
					/>
				</div>
			</form>
		</>
	);
}

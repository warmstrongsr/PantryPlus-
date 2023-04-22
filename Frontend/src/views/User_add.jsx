import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Add_Recipe({ loggedIn, flashMessage }) {
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
		let requestBody = JSON.stringify({ user_id, recipe_id });

		// Make the fetch request
		let response = await fetch("http://localhost:5000/api/recipes", {
			method: "POST",
			headers: myHeaders,
			body: requestBody
		});

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
			<h3 className="text-center">Add a Recipe</h3>
			<form action="" onSubmit={handleSubmit}>
				<div className="form-group">
					<button type="submit" className="btn btn-success w-100">
						Add the Recipe
					</button>
				</div>
			</form>
		</>
	);
}
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function setFavorite(recipeID, loggedIn, flashMessage, navigate) {
	if (!loggedIn) {
		flashMessage("You must be logged in to set a recipe as favorite", "danger");

		navigate("/login");
		return;
	}

	fetch(`/favorites/${recipeID}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
		})
		.catch((error) => console.error(error));
}

export default function Favorites({
	recipe,
	user,
	image,
	loggedIn,
	flashMessage,
}) {
	const navigate = useNavigate();

	const removeFavorite = (recipeID) => {
		if (!loggedIn) {
			flashMessage(
				"You must be logged in to remove a recipe from favorites",
				"danger"
			);
			navigate("/login");
			return;
		}

		fetch(`/favorites/${recipeID}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		if (!loggedIn) {
			flashMessage(
				"You must be logged in to set a recipe as favorite",
				"danger"
			);
			navigate("/login");
		}
	}, [loggedIn, flashMessage, navigate]);

	return (
		<div className="card mt-3">
			<div className="card-header">{recipe.title}</div>
			<div className="row g-0">
				<div className="col-md-4">
					<img className="card-img-top" src={image} alt={recipe.title} />
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<h6 className="card-subtitle text">{recipe.date_created}</h6>
						<p className="card-text">{recipe.content}</p>
						<p className="card-text">
							<strong>Ingredients:</strong> {recipe.ingredients}
						</p>
						<button
							onClick={() =>
								setFavorite(recipe.id, loggedIn, flashMessage, navigate)
							}
						>
							Set Favorite
						</button>

						<a
							href={`https://spoonacular.com/recipes/${recipe.title
								.split(" ")
								.join("-")}-${recipe.id}`}
							target="_blank"
							rel="noopener noreferrer"
							className="btn btn-primary"
						>
							View on Spoonacular
						</a>
						{recipe.author && recipe.author.username === user.username ? (
							<>
								<Link to={`${recipe.id}`} className="btn btn-success w-80 mt-4">
									Edit
								</Link>
							</>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}

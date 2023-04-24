import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Favorite({ user_id, loggedIn, flashMessage }) {
	const navigate = useNavigate();

	if (!loggedIn) {
		flashMessage("You must be logged in to set a recipe as favorite", "danger");

		navigate("/login");
		return null;
	}

	fetch(`/favorites`, {
		method: "GET",
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
return null;
}

function Favorites({ user, loggedIn, flashMessage }) {
	const [favorites, setFavorites] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (!loggedIn) {
			flashMessage(
				"You must be logged in to set a recipe as favorite",
				"danger"
			);
			navigate("/login");
			return;
		}
		Favorite(user.id, loggedIn, flashMessage, navigate).then((data) => {
			setFavorites(data);
		});
	}, [user, loggedIn, flashMessage, navigate]);

	const removeFavorite = (recipeID) => {
		if (!loggedIn) {
			flashMessage(
				"You must be logged in to add/remove a recipe from favorites",
				"danger"
			);
			navigate("/login");
			return;
		}

		const isFavorite = favorites.some(
			(favorite) => favorite.recipe_id === recipeID
		);
		if (isFavorite) {
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
					setFavorites(
						favorites.filter((favorite) => favorite.recipe_id !== recipeID)
					);
				})
				.catch((error) => console.error(error));
		} else {
			fetch(`/favorites`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({
					recipe_id: recipeID,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					setFavorites([
						...favorites,
						{ recipe_id: recipeID, date_created: data.date_created },
					]);
					console.log("Updated favorites:", favorites);
				})
				.catch((error) => console.error(error));
		}
	};

	return (
		<div>
			<h2>My Favorites</h2>
			{favorites.map((recipe) => (
				<FavoriteItem
					key={recipe.id}
					recipe={recipe}
					removeFavorite={removeFavorite}
				/>
			))}
		</div>
	);
}

function FavoriteItem({ recipe, removeFavorite }) {
	const navigate = useNavigate();

	const handleFavorite = () => {
		removeFavorite(recipe.id);
	};

	const handleViewRecipe = () => {
		navigate(`/recipes/${recipe.id}`);
	};

	return (
		<div className="card mt-3">
			<div className="card-header">{recipe.title}</div>
			<div className="row">
				<div className="col-md-4">
					<img src={recipe.image_url} alt={recipe.title} className="w-100" />
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<p className="card-text">{recipe.description}</p>
						<button className="btn btn-primary me-2" onClick={handleViewRecipe}>
							View Recipe
						</button>
						<button className="btn btn-danger" onClick={handleFavorite}>
							Remove from Favorites
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

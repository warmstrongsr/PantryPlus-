import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Favorite(user_id, loggedIn, flashMessage, navigate) {
	if (!loggedIn) {
		flashMessage("You must be logged in to set a recipe as favorite", "danger");

		navigate("/login");
		return;
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
}

	function Favorites({ user,image,loggedIn,flashMessage }) {
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
        setFavorites(favorites.filter((recipe) => recipe.id !== recipeID));
      })
      .catch((error) => console.error(error));
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

	return (
		<div className="card mt-3">
			<div className="card-header">{recipe.title}</div>
			<div className="row g-0">
				<div className="col-md-4">
					<img className="card-img-top" src={recipe.image} alt={recipe.title} />
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<h6 className="card-subtitle text">{recipe.date_created}</h6>
					</div>
				</div>
			</div>
			<div className="card-footer">
				<button
					className="btn btn-danger"
					onClick={() => removeFavorite(recipe.id)}
				>
					Remove
				</button>
				<button
					className="btn btn-primary ms-2"
					onClick={() => navigate(`/recipe/${recipe.id}`)}
				>
					View Recipe
				</button>
			</div>
		</div>
	);
}
	
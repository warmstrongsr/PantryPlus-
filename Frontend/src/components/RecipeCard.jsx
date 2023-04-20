import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addRecipe, addRecipeToFavorites } from "../api";

export default function LinkCard({ recipe, user, image, summary }) {
	const [isFavorite, setIsFavorite] = useState(false);

	const addRecipeToFavorites = async () => {
		try {
			const newFavorite = await addRecipeToFavorites(recipe);
			setIsFavorite(true);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className="card mt-3">
				<div className="card-header">{recipe.title}</div>
				<div className="row g-0">
					<div className="col-md-4">
						<img className="card-img-top" src={image} alt={recipe.title} />
					</div>
					<div className="col-md-8">
						<div className="card-body">
							<h6 className="card-subtitle text">{recipe.date_created}</h6>
							<p className="card-text">{recipe.summary}</p>
							<p className="card-text">
								<strong>Ingredients:</strong> {recipe.title}
							</p>

							<a
								href={`https://spoonacular.com/recipes/${recipe.title
									.split(" ")
									.join("-")}-${recipe.id}`}
								target="_blank"
								rel="noopener noreferrer"
								className="btn btn-primary w-30"
								style={{ width: 150, marginLeft: 20 }}
							>
								View on Spoonacular
							</a>

							<button
								onClick={addRecipeToFavorites}
								className="btn btn-primary w-40"
								style={{ width: 150, marginLeft: 30 }}
								disabled={isFavorite}
							>
								{isFavorite ? "Favorited" : "Favorite this Recipe"}
							</button>

							{recipe.author && recipe.author.username === user.username ? (
								<>
									<Link
										to={`${recipe.id}`}
										className="btn btn-success w-60 mt-4"
									>
										Edit
									</Link>
								</>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

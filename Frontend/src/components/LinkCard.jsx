import React from "react";
import { Link } from "react-router-dom";

export default function LinkCard({ recipe, user, image }) {
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
							<p className="card-text">{recipe.content}</p>
							<p className="card-text">
								<strong>Ingredients:</strong> {recipe.ingredients}
							</p>
							<a
								href={recipe.spoonacular_source_url}
								target="_blank"
								rel="noopener noreferrer"
								className="btn btn-primary"
							>
								View on Spoonacular
							</a>
							{recipe.author && recipe.author.username === user.username ? (
								<>
									<Link
										to={`${recipe.id}`}
										className="btn btn-success w-100 mt-2"
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

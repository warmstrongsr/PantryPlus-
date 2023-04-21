import React, { useState } from "react";
import { Link } from "react-router-dom";
import './styles.css'
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { add_recipe_to_favorites, handleAddRecipeToFavorites } from "../api";

export default function LinkCard({
	recipe,
	user,
	image,
	summary,
	nutrtionLabel,
}) {
	const [isFavorite, setIsFavorite] = useState(false);

	const handleclick = async () => {
		try {
			const result = await add_recipe_to_favorites(recipe.id);
			setIsFavorite(true);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		// 		<>
		// 			<div className="card mt-3">
		// 				<div className="card-header">
		// 					<strong>{recipe.title}</strong>
		// 				</div>
		// 				<div className="row g-2">
		// 					<div className="col-md-4">
		// 						<img className="card-img-top" src={image} alt={recipe.title} />
		// 					</div>
		// 					<div className="col-md-8">
		// 						<div className="card-body">
		// 							<div className="row g-0">
		// 								<h6 className="card-subtitle text">{recipe.date_created}</h6>
		// 								<p className="card-text">{recipe.summary}</p>
		// 								<p className="card-text">
		// 									<strong>Recipe ID:</strong> {recipe.id}
		// 									{recipe.user_id === user.id ? (
		// 										<>
		// 											{/* <Link
		// 											to={`/edit/${recipe.id}`}
		// 											className="btn btn-success w-60 ml-4 mt-0"
		// 											style={{ marginLeft: 50 }}
		// 										>
		// 											Edit
		// 										</Link> */}
		// 										</>
		// 									) : null}
		// 								</p>

		// 								<a
		// 									href={`https://spoonacular.com/recipes/${recipe.title
		// 										.split(" ")
		// 										.join("-")}-${recipe.id}`}
		// 									target="_blank"
		// 									rel="noopener noreferrer"
		// 									className="btn btn-primary w-40"
		// 									style={{ width: 150, marginLeft: 20 }}
		// 								>
		// 									View on Spoonacular
		// 								</a>

		// 								<button
		// 									onClick={handleclick}
		// 									className="btn btn-primary w-40"
		// 									style={{ width: 150, marginLeft: 30 }}
		// 									disabled={isFavorite}
		// 								>
		// 									{isFavorite ? "Favorited" : "Favorite this Recipe"}
		// 								</button>
		// 								<Link
		// 									to={`/edit/${recipe.id}`}
		// 									className="btn btn-success w-60 ml-4 mt-2"
		// 									style={{ width: 150, marginLeft: 20 }}
		// 								>
		// 									Edit
		// 								</Link>
		// 								<Link
		// 									to={`/edit/${recipe.id}`}
		// 									className="btn btn-danger w-60 ml-4 mt-2"
		// 									style={{ width: 150, marginLeft: 30 }}
		// 								>
		// 									Delete
		// 								</Link>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</>
		// 	);
		// }
	
			<div className="column sm=  ">
				<div className="mb-3 mt-3">
					
						<Card style={{ width: "18rem" }}>
							<div className="text-center">
								<Card.Title>{recipe.title}</Card.Title>
							</div>
							<Card.Img variant="top" src={image} alt={recipe.title} />
							<Card.Body>
								<Card.Text>
									<div className="fs-1">
										<div className="row g-2">
											{/* <div style={{ display: }}> */}
											<a
												href={`https://spoonacular.com/recipes/${recipe.title
													.split(" ")
													.join("-")}-${recipe.id}`}
												target="_blank"
												rel="noopener noreferrer"
												className="btn btn-outline-success w-60 ml-4 mt-2"
												style={{
													// display: "flex",
													// justifyContent: "center",
													width: "8rem",
												}}
											>
												View on Spoonacular
											</a>
											<button
												onClick={handleclick}
												className="btn btn-outline-success w-60 ml-4 mt-2"
												style={{
													// display: "flex",
													// justifyContent: "center",
													width: "8rem",
												}}
												disabled={isFavorite}
											>
												{isFavorite ? "Favorited" : "Favorite this Recipe"}
											</button>
										</div>
									</div>
									{/* </div> */}
								</Card.Text>
							</Card.Body>
							<ListGroup className="list-group-flush">
								<ListGroup.Item>
									{recipe.user_id === user.id ? (
										<>
											<Link
												to={`/edit/${recipe.id}`}
												className="btn btn-outline-danger w-60 ml-4 mt-2"
												style={{
													display: "flex",
													justifyContent: "center",
													width: "16rem",
												}}
											>
												Delete
											</Link>
										</>
									) : null}
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</div>
				</div>
			
	);
}
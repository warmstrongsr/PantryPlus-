const API_BASE_URL = "http://localhost:5000";

const getRecipes = async () => {
	const response = await fetch(`${API_BASE_URL}/recipes`);
	const data = await response.json();
	return data;
};

const removeRecipeFromFavorites = async (recipeId) => {
	const token = localStorage.getItem("token");
	if (!token) {
		throw new Error("User is not logged in.");
	}

	const response = await fetch(
		`${API_BASE_URL}/api/recipes/${recipeId}/favorite`,
		{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}
	);

	const data = await response.json();
	return data;
};

// const addRecipe = async (recipe) => {
// 	const response = await fetch(`${API_BASE_URL}/recipes`, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(recipe),
// 	});
// 	const data = await response.json();
// 	return data;
// };

const add_recipe_to_favorites = async (recipeId) => {
	const token = localStorage.getItem("token");
	if (!token) {
		throw new Error("User is not logged in.");
	}

	const response = await fetch(`${API_BASE_URL}/api/recipes/${recipeId}/favorite`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ recipeId }),
	});

	const data = await response.json();
	return data;
};
const addRecipe = async (recipeId) => {
	const token = localStorage.getItem("token");
	if (!token) {
		throw new Error("User is not logged in.");
	}

	const response = await fetch(`${API_BASE_URL}/favorites`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ recipeId }),
	});

	const data = await response.json();
	return data;
};

const handleAddRecipeToFavorites = async (recipeId) => {
	const token = localStorage.getItem("token");
	if (!token) {
		throw new Error("User is not logged in.");
	}

	const response = await fetch(`${API_BASE_URL}/favorites`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ recipeId }),
	});

	const data = await response.json();
	return data;
};

export { getRecipes, addRecipe, add_recipe_to_favorites, handleAddRecipeToFavorites };

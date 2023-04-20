const API_BASE_URL = "http://localhost:5000";

const getRecipes = async () => {
	const response = await fetch(`${API_BASE_URL}/recipes`);
	const data = await response.json();
	return data;
};

const addRecipe = async (recipe) => {
	const response = await fetch(`${API_BASE_URL}/recipes`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(recipe),
	});
	const data = await response.json();
	return data;
};

export { getRecipes, addRecipe };


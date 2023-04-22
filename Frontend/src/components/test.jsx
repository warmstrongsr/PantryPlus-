export const addRecipe = async (recipeData) => {
	const response = await fetch("/api/recipes", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("access_token")}`,
		},
		body: JSON.stringify(recipeData),
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message);
	}
	return data;
};

import recipesApi from "./recipesApi";

export default async function searchRecipe(query) {
  const response = await recipesApi.get("/recipes/search", {
    params: { q: query },
  });
  return response.data;
}
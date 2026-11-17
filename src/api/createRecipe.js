import recipesApi from "./recipesApi";


export default async function createRecipe(payload) {
        const response = await recipesApi.post("/recipes/", payload)
        return response.data
}
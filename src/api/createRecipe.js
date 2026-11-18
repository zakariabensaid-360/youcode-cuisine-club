import recipesApi from "./recipesApi";


export default async function createRecipe(payload) {
        const response = await recipesApi.post("/recipes/add", payload)
        return response.data
}
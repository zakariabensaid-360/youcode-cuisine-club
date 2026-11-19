import recipesApi from "./recipesApi";


export default async function updateRecipe(id, payload) {
        const response = await recipesApi.put("/recipes/" + id, payload)
        return response.data
}
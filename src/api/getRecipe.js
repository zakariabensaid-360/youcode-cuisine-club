import recipesApi from "./recipesApi";


export default async function getRecipe(id) {
        const response = await recipesApi.get("/recipes/"+id)
        return response.data
}
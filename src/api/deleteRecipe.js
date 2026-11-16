import recipesApi from "./recipesApi";


export default async function deleteRecipe(id) {
        const response = await recipesApi.delete("/recipes/"+id)
        return response.data

}
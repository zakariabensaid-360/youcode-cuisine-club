import recipesApi from "./recipesApi";


export default async function searchRecipe(querey) {
        const response = await recipesApi.get("/recipes/search?q="+querey)
        return response.data

}
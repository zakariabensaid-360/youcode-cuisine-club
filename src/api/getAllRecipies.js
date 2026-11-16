import recipesApi from "./recipesApi";


export default async function getAllRecipies() {
        const response = await recipesApi.get("/recipes")
        return response.data
}
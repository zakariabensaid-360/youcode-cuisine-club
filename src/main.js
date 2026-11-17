import deleteRecipe from "./api/deleteRecipe";
import getAllRecipies from "./api/getAllRecipies";
import searchRecipe from "./api/searchRecipe";
import createRecipeCard from "./components/CreateRecipeCard";
import CreateRecipeCardSkeleton from "./components/createRecipeCardSkeleton";

const cardbox = document.getElementById("cardbox");
const counter = document.getElementById("counter");
const searchInput = document
  .getElementById("search-form")
  .querySelector("input");
const searchButton = document.getElementById("search-btn");
const resetButton = document.getElementById("reset-btn");
const errorSection = document.getElementById("error");
const errorTitle = document.getElementById("error-title");
const errorMessage = document.getElementById("error-message");

async function renderCards(cb, search = false) {
  try {
    searchButton.disabled = true;
    resetButton.disabled = true;
    error.classList.add("hidden");
    cardbox.replaceChildren();
    for (let i = 0; i < 12; i++) {
      cardbox.append(CreateRecipeCardSkeleton());
    }
    if (search) {
      const response = await cb(searchInput.value);
      let cards = response.recipes.map(createRecipeCard);
      cardbox.replaceChildren();
      cardbox.append(...cards);
      counter.textContent = cards.length;

      if (cards.length == 0) {
        const span = document.createElement("span");
        span.textContent = "There are no recipes found with that name.";
        span.className =
          "block text-center text-gray-500  font-medium py-8 px-4 bg-gray-50 rounded-lg border border-dashed border-gray-200 text-xl";
        cardbox.append(span);
      }
    } else {
      const response = await cb();
      let cards = response.recipes.map(createRecipeCard);
      cardbox.replaceChildren();
      cardbox.append(...cards);
      counter.textContent = cards.length;
    }
  } catch (error) {
    cardbox.replaceChildren();
    errorSection.classList.remove("hidden");
    errorTitle.textContent = error.name;
    errorMessage.textContent = error.message;
  } finally {
    searchButton.disabled = false;
    resetButton.disabled = false;
  }
}

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (searchInput.value == "") return;
  renderCards(searchRecipe, true);
});

resetButton.addEventListener("click", (e) => {
  e.preventDefault();
  renderCards(getAllRecipies);

setTimeout(() => {
 console.log(cardbox.querySelector(`[data-recipe-id="2"]`))
}, 2000)
 
});

cardbox.addEventListener("click", async (e) => {
  e.preventDefault()
  const button = e.target.closest("button")
  if(!button) return;
  const article = button.closest("article")
  const id = article.dataset.recipeId
  try {
  article.remove()
  deleteRecipe(id)
  counter.textContent = Number(counter.textContent) - 1
  } catch (error) {
    alert("failed to delete ")
  }
})


/*
async function test() {
  const response = await getAllRecipies()
  let cards = response.recipes.map(createRecipeCard)
  cardbox.append(...cards)
}
test()

*/



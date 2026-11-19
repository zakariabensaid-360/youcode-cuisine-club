import createRecipe from "./api/createRecipe";
import deleteRecipe from "./api/deleteRecipe";
import getAllRecipies from "./api/getAllRecipies";
import searchRecipe from "./api/searchRecipe";
import updateRecipe from "./api/updateRecipe";
import createRecipeCard from "./components/ceateRecipeCard";
import createRecipeCardSkeleton from "./components/createRecipeCardSkeleton";

const cardbox = document.getElementById("cardbox");
const counter = document.getElementById("counter");
const searchInput = document
  .getElementById("search-form")
  .querySelector("input");
const searchButton = document.getElementById("search-btn");
const resetButton = document.getElementById("reset-btn");
const errorSection = document.getElementById("error");
const errorTitle = document.getElementById("error-title");
const addDisplay =  document.getElementById("add-display")
const errorMessage = document.getElementById("error-message");
const addModal =  document.getElementById("add-modal")
const retry =  document.getElementById("retry-btn")
async function renderCards(cb, search = false) {
  try {
    searchButton.disabled = true;
    resetButton.disabled = true;
    error.classList.add("hidden");
    cardbox.replaceChildren();
    for (let i = 0; i < 12; i++) {
      cardbox.append(createRecipeCardSkeleton());
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
function formatAxiosError(error) {
  if (!error.response) {
    return {
      title: "Connection Problem",
      message: "Couldn't reach the server. Check your internet connection and try again."
    };
  }

  const status = error.response.status;

  if (status === 404) {
    return {
      title: "Not Found",
      message: "No matching recipes were found."
    };
  }

  if (status >= 500) {
    return {
      title: "Server Error",
      message: "The server is having trouble right now. Please try again shortly."
    };
  }

  return {
    title: "Request Failed",
    message: error.response.data?.message || `Something went wrong (status ${status}).`
  };
}

cardbox.replaceChildren();
errorSection.classList.remove("hidden");
const { title, message } = formatAxiosError(error);
errorTitle.textContent = title;
errorMessage.textContent = message;
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
});

cardbox.addEventListener("click", async (e) => {
  e.preventDefault()
  const button = e.target.closest("button")
  
  if(!button) return;

    const article = button.closest("article")
  const id = article.dataset.recipeId
  if(button.dataset.action === "delete") {
  try {
  await deleteRecipe(id)
  article.remove()
  counter.textContent = Number(counter.textContent) - 1
  } catch (error) {
    alert("failed to delete ")
  }
  } else if(button.dataset.action === "update") {
    try {
      const Name = prompt("What is the new name?");


      const updated = await  updateRecipe(id, {
        name: Name
      })

      article.replaceWith(createRecipeCard(updated))
    } catch (error) {
      alert(error)
    }
  }


})



let draggedItem = null
let draggedOver = null

const dragStyles = ["opacity-50", "scale-95", "ring-2", "ring-amber-500"]
const dragOverStyles = ["opacity-50", "scale-95", "ring-2", "ring-green-500"]

cardbox.addEventListener("dragstart", (e) => {
  const article = e.target.closest("article")
  if (!article) return

  draggedItem = article
  for (let i = 0; i < dragStyles.length; i++) {
    draggedItem.classList.add(dragStyles[i])
  }
})



cardbox.addEventListener("dragover", async (e) => {

  const article = e.target.closest("article")
  if(article == draggedItem) return;
  draggedOver = article
    for (let i = 0; i < dragOverStyles.length; i++) {
    draggedOver.classList.add(dragOverStyles[i])
  }
})

cardbox.addEventListener("dragleave", (e) => {
  if(draggedOver) {
    for (let i = 0; i < dragOverStyles.length; i++) {
      draggedOver.classList.remove(dragOverStyles[i])
    }
  }
})

cardbox.addEventListener("dragend", () => {
  console.log("the dragged item", draggedItem)
  console.log("========================")
  console.log("the dragged over", draggedOver)

  if (draggedItem && draggedOver && draggedItem !== draggedOver) {
for (let i = 0; i < dragStyles.length; i++) {
      draggedItem.classList.remove(dragStyles[i])
    }

    const test = document.createElement("div")
    draggedOver.before(test)
    draggedItem.replaceWith(draggedOver)
    test.replaceWith(draggedItem)
  }

  draggedItem = null
  draggedOver = null
})

addDisplay.addEventListener("click" , (e) => { 
  addModal.classList.toggle("hidden")
})

const recipeForm = document.getElementById("recipe-form");
const nameRecipe = document.getElementById("name");
const cookingMethod = document.getElementById("cooking");
const difficultyLevel = document.getElementById("difficulty");
const prepTime = document.getElementById("time");

const nameError = document.getElementById("name-error");
const cookingError = document.getElementById("cooking-error");
const difficultyError = document.getElementById("difficulty-error");
const timeError = document.getElementById("time-error");
const successMessage = document.getElementById("success-message");

recipeForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const trimmedName = nameRecipe.value.trim();
  const selectedCooking = cookingMethod.value;
  const selectedDifficulty = difficultyLevel.value;
  const parsedTime = Number(prepTime.value);

  const isNameValid = trimmedName.length >= 3 && trimmedName.length <= 60;
  const isCookingValid = Boolean(selectedCooking);
  const isDifficultyValid = Boolean(selectedDifficulty);
  const isTimeValid =
    Number.isFinite(parsedTime) && parsedTime >= 1 && parsedTime <= 300;

  nameError.classList.toggle("hidden", isNameValid);
  cookingError.classList.toggle("hidden", isCookingValid);
  difficultyError.classList.toggle("hidden", isDifficultyValid);
  timeError.classList.toggle("hidden", isTimeValid);

  if (!isNameValid || !isCookingValid || !isDifficultyValid || !isTimeValid) {
    successMessage.classList.add("hidden");
    return;
  }

const payload = {
    id: Date.now(),
    name: trimmedName,
    ingredients: [
      "Fresh ingredients",
      "Olive oil",
      "Salt and pepper to taste",
    ],
    instructions: [
      `Prepare ingredients for ${selectedCooking}.`,
      `Cook using ${selectedCooking} method for ${parsedTime} minutes.`,
      "Serve warm.",
    ],
    prepTimeMinutes: 10,
    cookTimeMinutes: parsedTime,
    servings: 4,
    difficulty:
      selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1),
    cuisine: "Moroccan",
    caloriesPerServing: 350,
    tags: [
      selectedCooking.charAt(0).toUpperCase() + selectedCooking.slice(1),
      "Homemade",
    ],
    userId: 45,
    image: "https://cdn.dummyjson.com/recipe-images/1.webp",
    rating: 4.5,
    reviewCount: 1,
    mealType: ["Dinner"],
  };
  successMessage.classList.remove("hidden");

  try {
    const response = await createRecipe(payload)
    const card =  createRecipeCard(response)
    cardbox.append(card)
  } catch (error) {
    alert("an error did happen check the console for information")
    console.log(error)
  }
  recipeForm.reset();


  addModal.classList.toggle("hidden")
});




retry.addEventListener("click", (e) => {
  e.preventDefault()
  renderCards(getAllRecipies);

})

renderCards(getAllRecipies);


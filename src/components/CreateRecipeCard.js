export default function CreateRecipeCard(recipe) {
  const card = document.createElement("article");
  card.className =
    "bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col justify-between";
  card.dataset.recipeId = recipe.id;

  const img = document.createElement("img");
  img.src = recipe.image;
  img.alt = recipe.name;
  img.loading = "lazy";
  img.className = "w-full h-44 object-cover bg-gray-100";

  const body = document.createElement("div");
  body.className = "p-4 flex-1 flex flex-col gap-3";

  const topRow = document.createElement("div");
  topRow.className = "flex items-center justify-between gap-2 text-xs text-gray-500";

  const cuisine = document.createElement("span");
  cuisine.className = "font-medium text-gray-700";
  cuisine.textContent = recipe.cuisine;

  const rating = document.createElement("span");
  rating.className = "font-medium text-gray-700";
  rating.textContent = `${recipe.rating} (${recipe.reviewCount})`;

  topRow.append(cuisine, rating);

  const title = document.createElement("h3");
  title.className = "text-base font-semibold text-gray-900";
  title.textContent = recipe.name;

  const metaList = document.createElement("ul");
  metaList.className = "text-sm text-gray-600 space-y-1";

  const prepItem = document.createElement("li");
  prepItem.textContent = `Préparation : ${recipe.prepTimeMinutes} min`;

  const cookItem = document.createElement("li");
  cookItem.textContent = `Cuisson : ${recipe.cookTimeMinutes} min`;

  const servingsItem = document.createElement("li");
  servingsItem.textContent = `Portions : ${recipe.servings}`;

  const caloriesItem = document.createElement("li");
  caloriesItem.textContent = `Calories : ${recipe.caloriesPerServing} kcal`;

  const difficultyItem = document.createElement("li");
  difficultyItem.textContent = `Difficulté : ${recipe.difficulty}`;

  metaList.append(prepItem, cookItem, servingsItem, caloriesItem, difficultyItem);

  body.append(topRow, title, metaList);

  const footer = document.createElement("div");
  footer.className =
    "px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between";

  const mealText = document.createElement("span");
  mealText.className = "text-xs text-gray-500";
  mealText.textContent = (recipe.mealType || []).join(", ");

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.dataset.action = "delete";
  
  deleteBtn.className =
    "px-3 py-1.5 text-xs font-medium text-red-600 bg-white hover:bg-red-50 border border-red-200 rounded-lg cursor-pointer";
  deleteBtn.textContent = "Supprimer";

  footer.append(mealText, deleteBtn);
  card.append(img, body, footer);

  return card;
}
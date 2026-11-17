export default function createRecipeCardSkeleton() {
  const card = document.createElement("article");
  card.className =
    "bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col justify-between animate-pulse";
  card.setAttribute("aria-hidden", "true");

  const img = document.createElement("div");
  img.className = "w-full h-44 bg-gray-200";

  const body = document.createElement("div");
  body.className = "p-4 flex-1 flex flex-col gap-3";

  const topRow = document.createElement("div");
  topRow.className = "flex items-center justify-between gap-2";

  const cuisine = document.createElement("div");
  cuisine.className = "h-3.5 w-20 bg-gray-200 rounded";

  const rating = document.createElement("div");
  rating.className = "h-3.5 w-16 bg-gray-200 rounded";

  topRow.append(cuisine, rating);

  const title = document.createElement("div");
  title.className = "h-5 w-3/4 bg-gray-200 rounded";

  const metaList = document.createElement("ul");
  metaList.className = "space-y-1.5 pt-0.5";

  const widths = ["w-36", "w-32", "w-28", "w-40", "w-32"];
  const metaItems = widths.map((widthClass) => {
    const item = document.createElement("li");
    const bar = document.createElement("div");
    bar.className = `h-4 ${widthClass} bg-gray-200 rounded`;
    item.append(bar);
    return item;
  });

  metaList.append(...metaItems);
  body.append(topRow, title, metaList);

  const footer = document.createElement("div");
  footer.className =
    "px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between";

  const mealText = document.createElement("div");
  mealText.className = "h-3.5 w-24 bg-gray-200 rounded";

  const deleteBtn = document.createElement("div");
  deleteBtn.className = "h-7 w-20 bg-gray-200 rounded-lg";

  footer.append(mealText, deleteBtn);
  card.append(img, body, footer);

  return card;
}
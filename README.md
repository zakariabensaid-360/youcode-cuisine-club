# 🍳 YouCode Cuisine Club

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)
[![DummyJSON](https://img.shields.io/badge/API-DummyJSON-orange)](https://dummyjson.com/)

A lightweight, framework-free online recipe catalog built for the **YouCode Cuisine Club**. Powered by vanilla JavaScript, Tailwind CSS, and a centralized Axios instance, this French-language web application integrates with the [DummyJSON Recipes API](https://dummyjson.com/docs/recipes) to browse, search, add, and remove recipes with clean error handling and skeleton loading states.

---

## ✨ Key Features

- **Responsive Recipe Catalog:** Displays recipes in an adaptive card grid (`#cardbox`) with metadata and images.
- **Live & Form Search:** Search recipes by name via `/recipes/search`, complete with a reset button and empty-state feedback.
- **Modal Recipe Creation:** Add new recipes through an accessible modal form with client-side validation (name, cooking method, difficulty, and prep/cook time).
- **Optimistic-Free DOM Updates:** Safely handles additions and instant card deletions while keeping recipe counters synchronized.
- **Skeleton Loading States:** Renders placeholder skeleton cards during asynchronous network requests to prevent layout shifts.
- **Graceful Error Handling:** Catches API failures and displays clear feedback inside a dedicated error alert panel.

---

## 🛠️ Tech Stack

- **Core:** Vanilla JavaScript (ES Modules), HTML5
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **HTTP Client:** Axios
- **Data Source:** DummyJSON Public Recipes API

---

## 📂 Project Structure

```text
youcode-cuisine-club/
├── index.html                  # Main HTML entry point (header, search, modal, grid)
├── package.json                # Dependencies and npm scripts
├── vite.config.js              # Vite bundler configuration
├── LICENSE                     # Project license
├── README.md                   # Documentation
└── src/
    ├── api/                    # Modular Axios API layer
    │   ├── recipesApi.js       # Central Axios instance (baseURL: [https://dummyjson.com/](https://dummyjson.com/))
    │   ├── getAllRecipies.js   # Fetch all recipes
    │   ├── getRecipe.js        # Fetch a single recipe by ID
    │   ├── searchRecipe.js     # Search recipes by query
    │   ├── createRecipe.js     # Send POST request to add a recipe
    │   └── deleteRecipe.js     # Send DELETE request to remove a recipe
    ├── components/             # Reusable DOM element factories
    │   ├── CreateRecipeCard.js         # Renders an individual recipe card
    │   └── CreateRecipeCardSkeleton.js # Renders a loading skeleton card
    ├── main.js                 # App entry point, event listeners, and state logic
    └── style.css               # Global styles and Tailwind directives
```

---

## 🔄 Architecture & Data Flow

1. **Initialization:** `index.html` loads the application shell and imports `src/main.js`.
2. **Data Fetching:** `renderCards()` triggers skeleton placeholders and calls the modular API functions in `src/api/`.
3. **HTTP Layer:** All requests route through the configured Axios instance in `src/api/recipesApi.js`.
4. **DOM Rendering:** Fetched recipe objects are passed into `CreateRecipeCard.js` to generate DOM nodes and inject them into `#cardbox`.
5. **User Interactions:** Search queries, modal form validations, and card deletions dynamically update the DOM and recipe counters.

---

## 🔌 API Integration

All requests use the base URL configured in `src/api/recipesApi.js`:

```javascript
[https://dummyjson.com/](https://dummyjson.com/)
```

| Method | Endpoint | Description | File |
| :--- | :--- | :--- | :--- |
| `GET` | `/recipes` | Retrieve all recipes | `getAllRecipies.js` |
| `GET` | `/recipes/{id}` | Retrieve a single recipe by ID | `getRecipe.js` |
| `GET` | `/recipes/search?q={query}` | Search recipes by keyword | `searchRecipe.js` |
| `POST` | `/recipes/add` *(or `/recipes/`)* | Submit a new recipe payload | `createRecipe.js` |
| `DELETE` | `/recipes/{id}` | Remove a recipe by ID | `deleteRecipe.js` |

> **Note:** Because DummyJSON is a mock REST API, `POST` and `DELETE` requests simulate server mutations and return mock responses without persisting changes permanently on the backend.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- `npm`

### Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/zakariabensaid-360/youcode-cuisine-club.git](https://github.com/zakariabensaid-360/youcode-cuisine-club.git)
   cd youcode-cuisine-club
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Vite development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:** Navigate to the local URL displayed in your terminal (typically `http://localhost:5173`).

### Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local development server with hot module replacement (HMR). |
| `npm run build` | Bundles and optimizes the application for production into `dist/`. |
| `npm run preview` | Serves the production build locally for final testing. |

---

## 📄 License

Distributed under the terms specified in the [LICENSE](./LICENSE) file.
```
{
const applicationID = '23fda7aa';
const applicationKey = '7ffe8772cb84f59861c8b70b7509742f';

async function searchRecipeResults(query) {
    try {
        let response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${applicationID}&app_key=${applicationKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let recipeData = await response.json();
        console.log(recipeData);
        displayRecipeDetails(recipeData.hits);
    } catch (error) {
        console.error('Error fetching the recipe data:', error);
    }
}

function displayRecipeDetails(recipes) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    recipes.forEach((recipe, id) => {
        const recipeContainer = document.createElement('div');
        recipeContainer.classList.add('recipe');
        recipeContainer.innerHTML = `
            <img src="${recipe.recipe.image}" />
            <h3>${recipe.recipe.label}</h3>
            <p>${recipe.recipe.source}</p>
            <button id='getDetailsBtn${id}'>Details</button>
        `;
        resultsContainer.appendChild(recipeContainer);
        document.getElementById('getDetailsBtn' + id).addEventListener('click', function() {
            window.location.href = `details.html?uri=${encodeURIComponent(recipe.recipe.uri)}`;
        });
    });
}

// function to get detailed information about a specific recipe
async function getRecipeDetails(uri) {
    try {
        console.log(`Fetching details for URI: ${uri}`);
        let response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&r=${encodeURIComponent(uri)}&app_id=${applicationID}&app_key=${applicationKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let recipedetails = await response.json();
        console.log('Recipe details:', recipedetails);
        return recipedetails[0]; // API returns an array with a single recipe object
    } catch (error) {
        console.error('Error fetching the recipe data:', error);
    }
}

// function to get and display detailed recipe information
async function getAndDisplayRecipeDetails(uri) {
    const recipe = await getRecipeDetails(uri);
    console.log('Results', recipe);
    if (recipe) {
        const detailContainer = document.getElementById('details');
        detailContainer.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.label}" />
            <h3>${recipe.label}</h3>
            <p>${recipe.source}</p>
            <p><strong>Ingredients:</strong></p>
            <ul>${(recipe.ingredientLines || []).map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
            <p><strong>Calories:</strong> ${recipe.calories ? recipe.calories.toFixed(2) : 'N/A'}</p>
            <button id="favoritebutton">${isFavorite(recipe.uri) ? 'Remove from Favorites' : 'Add to Favorites'}</button>
            <button onclick="window.history.back()">Back</button>
        `;

        document.getElementById('favoritebutton').addEventListener('click', function() {
            toggleFavorite(recipe);
            this.textContent = isFavorite(recipe.uri) ? 'Remove from Favorites' : 'Add to Favorites';
        });
    } else {
        console.error('Failed to fetch recipe details');
    }
}

function isFavorite(uri) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.some(favorite => favorite.uri === uri);
}

function toggleFavorite(recipe) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite(recipe.uri)) {
        favorites = favorites.filter(favorite => favorite.uri !== recipe.uri);
    } else {
        favorites.push(recipe);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}
// event listener for the search form
document.getElementById('searchform').addEventListener('submit', (event) => {
    event.preventDefault();
    const query = document.getElementById('searchinput').value;
    searchRecipeResults(query);
});
}

{
    const applicationID = '23fda7aa';
    const applicationKey = '7ffe8772cb84f59861c8b70b7509742f';

// Function to get detailed information about a specific recipe
async function getRecipeDetails(uri) {
    try {
        console.log(`Fetching details for URI: ${uri}`);
        let response = await fetch(`https://api.edamam.com/api/recipes/v2/${encodeURIComponent(uri)}?type=public&app_id=${applicationID}&app_key=${applicationKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let recipedetails = await response.json();
        console.log('Recipe details:', recipedetails);
        return recipedetails.recipe;
    } catch (error) {
        console.error('Error fetching the recipe data:', error);
    }
}

// Function to get and display detailed recipe information
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

// Extract the URI from the query parameters and display the recipe details
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const uri = params.get('uri');
    if (uri) {
        getAndDisplayRecipeDetails(uri);
    } else {
        console.error('No URI found in query parameters');
    }
});

}
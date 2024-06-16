// {
//     // Function to display favorite recipes
// function displayFavorites() {
//     const favoritesContainer = document.getElementById('favorites');
//     favoritesContainer.innerHTML = '';

//     const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//     if (favorites.length === 0) {
//         favoritesContainer.innerHTML = '<p>No favorite recipes yet.</p>';
//     } else {
//         favorites.forEach(recipe => {
//             const recipeContainer = document.createElement('div');
//             recipeContainer.classList.add('favorite-recipe');
//             recipeContainer.innerHTML = `
//                 <img src="${recipe.image}" alt="${recipe.label}" />
//                 <h3>${recipe.label}</h3>
//                 <p>${recipe.source}</p>
//                 <p><strong>Ingredients:</strong></p>
//                 <ul>${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
//                 <p><strong>Calories:</strong> ${recipe.calories ? recipe.calories.toFixed(2) : 'N/A'}</p>
//                 <button onclick="removeFavorite('${recipe.uri}')">Remove from Favorites</button>
//             `;
//             favoritesContainer.appendChild(recipeContainer);
//         });
//     }
// }

// // Function to remove a recipe from favorites
// function removeFavorite(uri) {
//     let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//     favorites = favorites.filter(recipe => recipe.uri !== uri);
//     localStorage.setItem('favorites', JSON.stringify(favorites));
//     displayFavorites();
// }

// // Event listener to display favorites when the page loads
// document.addEventListener('DOMContentLoaded', () => {
//     displayFavorites();
// });
// }

// // chrome.exe --disable-web-security --user-data-dir="C:/ChromeDevSession"

document.addEventListener('DOMContentLoaded', () => {
    const favoritesContainer = document.getElementById('favorites')
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []

    if (favorites.length > 0) {
        favorites.forEach((recipe, index) => {
            const recipeContainer = document.createElement('div')
            recipeContainer.classList.add('favorites')
            recipeContainer.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.label}" />
            <h3>${recipe.label}</h3>
            <p><strong>Source:</strong> ${recipe.source}</p>
            <p><strong>Ingredients:</strong></p>
            <ul>${(recipe.ingredientLines || [].map(ingredient => `<li>${ingredient}</li>`).join(''))}</ul>
            <p><strong>Calories:</strong> ${recipe.calories ? recipe.calories.toFixed(2) : 'N/A'}</p>
            <p><strong>Diet Labels:</strong> ${recipe.dietLabels.join(', ') || 'None'}</p>
            <p><strong>Health Labels:</strong> ${recipe.healthLabels.join(', ')}</p>
            <p><strong>Cautions:</strong> ${recipe.cautions.join(', ') || 'None'}</p>
            <p><strong>Total Weight:</strong> ${recipe.totalWeight ? recipe.totalWeight.toFixed(2) : 'N/A'} grams</p>
            <p><strong>Total Time:</strong> ${recipe.totalTime ? recipe.totalTime + ' minutes' : 'N/A'}</p>
            <button id="removeButton${index}">Remove from Favorites</button> <br>
            
            `
            favoritesContainer.appendChild(recipeContainer)

            // Event listener to remove recipe from favorites
            document.getElementById(`removeButton${index}`).addEventListener('click', () => {
                favorites.splice(index, 1);   
                localStorage.setItem('favorites', JSON.stringify(favorites))
                location.reload()
            })
        })
    } else {
        favoritesContainer.innerHTML = '<p>No favorite recipes found </p>'
    }
})
document.addEventListener('DOMContentLoaded', () => {
    const recipe = JSON.parse(localStorage.getItem('selectedRecipe'));
    if (recipe) {
        const detailContainer = document.getElementById('details');
        detailContainer.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.label}" />
            <h3>${recipe.label}</h3>
            <p><strong>Source:</strong> ${recipe.source}</p>
            <p><strong>Ingredients:</strong></p>
            <ul>${(recipe.ingredientLines || []).map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
            <p><strong>Calories:</strong> ${recipe.calories ? recipe.calories.toFixed(2) : 'N/A'}</p>
            <p><strong>Diet Labels:</strong> ${recipe.dietLabels.join(', ') || 'None'}</p>
            <p><strong>Health Labels:</strong> ${recipe.healthLabels.join(', ')}</p>
            <p><strong>Cautions:</strong> ${recipe.cautions.join(', ') || 'None'}</p>
            <p><strong>Total Weight:</strong> ${recipe.totalWeight ? recipe.totalWeight.toFixed(2) : 'N/A'} grams</p>
            <p><strong>Total Time:</strong> ${recipe.totalTime ? recipe.totalTime + ' minutes' : 'N/A'}</p>
        `;
    } else {
        console.error('No recipe details found in local storage');
    }

    // Back button event listener
    document.getElementById('backbutton').addEventListener('click', () => {
        window.history.back();
    });
});

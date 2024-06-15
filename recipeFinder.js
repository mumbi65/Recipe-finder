{
    const applicationID = '23fda7aa';
    const applicationKey = '7ffe8772cb84f59861c8b70b7509742f';

    // function to search recipes based on query
    async function searchRecipeResults(query){
        try {
            let response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${applicationID}&app_key=${applicationKey}`);
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            let recipeData = await response.json()
            console.log(recipeData)

            // Store the search results and query in local storage
            localStorage.setItem('searchResults', JSON.stringify(recipeData.hits))
            localStorage.setItem('searchQuery', query)

            displayRecipeDetails(recipeData.hits)

        } catch (error) {
            console.error('Error fetching the recipe data:', error);
        }
    }

    // function to display search results
    function displayRecipeDetails(recipes){
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';

        recipes.forEach((recipe, id) => {
            const recipeContainer = document.createElement('div')
            recipeContainer.classList.add('recipe')
            recipeContainer.innerHTML = `
            <img src="${recipe.recipe.image}"/>
            <h3>${recipe.recipe.label}</h3>
            <p>${recipe.recipe.source}</p>
            <button id='getDetailsBtn${id}'>Details</button>`;

            resultsContainer.appendChild(recipeContainer)
            document.getElementById('getDetailsBtn'+id).addEventListener('click', function(){getAndDisplayRecipeDetails(encodeURIComponent(recipe.recipe.uri))})
        });
        
    }

    // function to get detailed information about a specific recipe
    async function getRecipeDetails(uri){
        try {
            console.log(`Fetching details for URI: ${uri}`)
            let response = await fetch(`https://api.edamam.com/api/recipes/v2/${encodeURIComponent(uri)}?type=public&app_id=${applicationID}&app_key=${applicationKey}`);
            if(!response.ok){
                throw new Error(`HTTP error! status:${response.status}`)
            }
            let recipedetails = await response.json()
            console.log('Recipe details:',recipedetails)
            return recipedetails.recipe
        } catch (error) {
            console.error('Error fetching the recipe data:', error); 
        }
        
    }
    
    // function to get and display detailed recipe information
    async function getAndDisplayRecipeDetails(uri){
        console.log('getAndDisplayRecipeDetails called with URI', uri)
        const recipe = await getRecipeDetails(uri);
        console.log('Results', recipe)
        if(recipe){
            // Store the recipe details in local storage
            localStorage.setItem('selectedRecipe', JSON.stringify(recipe))

            // Navigate to the details page
            window.location.href = 'details.html' 
        }
        else{
            console.error('Failed to fetch recipe details')
        }
    }

    // Function to restore search results from local storage
    function restoreSearchResults(){
        const searchResults = JSON.parse(localStorage.getItem('searchResults'))
        const searchQuery = localStorage.getItem('searchQuery')
        if(searchResults && searchQuery){
            displayRecipeDetails(searchResults)
            document.getElementById('searchinput').value = searchQuery
        }
    }

    // Event listener for the search form
    document.getElementById('searchform').addEventListener('submit', (event) =>{
        event.preventDefault()
        const query = document.getElementById('searchinput').value
        searchRecipeResults(query)
    })

    // restore search results on page load
    window.addEventListener('load', restoreSearchResults)
}












// const APP_ID = 'YOUR_APP_ID';
// const APP_KEY = 'YOUR_APP_KEY';

// async function searchRecipes(query) {
//   const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
//   const data = await response.json();
//   displaySearchResults(data.hits);
// }

// function displaySearchResults(recipes) {
//   const resultsContainer = document.getElementById('results');
//   resultsContainer.innerHTML = '';
//   recipes.forEach(recipe => {
//     const recipeElement = document.createElement('div');
//     recipeElement.classList.add('recipe');
//     recipeElement.innerHTML = `
//       <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
//       <h3>${recipe.recipe.label}</h3>
//       <p>${recipe.recipe.source}</p>
//       <button onclick="getRecipeDetails('${recipe.recipe.uri}')">Details</button>
//     `;
//     resultsContainer.appendChild(recipeElement);
//   });
// }

// async function getRecipeDetails(uri) {
//   const encodedUri = encodeURIComponent(uri);
//   const response = await fetch(`https://api.edamam.com/search?r=${encodedUri}&app_id=${APP_ID}&app_key=${APP_KEY}`);
//   const data = await response.json();
//   displayRecipeDetails(data[0]);
// }

// function displayRecipeDetails(recipe) {
//   const detailsContainer = document.getElementById('details');
//   detailsContainer.innerHTML = `
//     <img src="${recipe.image}" alt="${recipe.label}">
//     <h2>${recipe.label}</h2>
//     <p><strong>Ingredients:</strong></p>
//     <ul>${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
//     <p><strong>Instructions:</strong> Visit <a href="${recipe.url}" target="_blank">here</a> for full instructions.</p>
//     <p><strong>Nutritional Information:</strong> ${recipe.totalNutrients.ENERC_KCAL.quantity.toFixed(2)} kcal</p>
//     <button onclick="addToFavorites('${recipe.uri}')">Add to Favorites</button>
//   `;
// }

// function addToFavorites(uri) {
//   let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//   if (!favorites.includes(uri)) {
//     favorites.push(uri);
//     localStorage.setItem('favorites', JSON.stringify(favorites));
//     alert('Recipe added to favorites!');
//   } else {
//     alert('Recipe is already in favorites!');
//   }
// }

// function loadFavorites() {
//   const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//   favorites.forEach(uri => {
//     getRecipeDetails(uri);
//   });
// }

// document.getElementById('searchForm').addEventListener('submit', (event) => {
//   event.preventDefault();
//   const query = document.getElementById('searchInput').value;
//   searchRecipes(query);
// });

// document.addEventListener('DOMContentLoaded', loadFavorites);

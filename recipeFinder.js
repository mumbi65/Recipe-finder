
    {
        const applicationID = '23fda7aa';
        const applicationKey = '7ffe8772cb84f59861c8b70b7509742f';
    
        // Function to search recipes based on query
        async function searchRecipeResults(query) {
            try {
                let response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${applicationID}&app_key=${applicationKey}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let recipeData = await response.json();
                console.log(recipeData);
    
                // Store the search results and query in local storage
                localStorage.setItem('searchResults', JSON.stringify(recipeData.hits));
                localStorage.setItem('searchQuery', query);
    
                displayRecipeDetails(recipeData.hits);
            } catch (error) {
                console.error('Error fetching the recipe data:', error);
            }
        }
    
        // Function to display search results
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
                document.getElementById('getDetailsBtn' + id).addEventListener('click', function () {
                    getAndDisplayRecipeDetails(encodeURIComponent(recipe.recipe.uri));
                });
            });
        }
    
        // Function to get detailed information about a specific recipe
        async function getRecipeDetails(uri) {
            try {
                console.log(`Fetching details for URI: ${uri}`);
                let response = await fetch(`https://api.edamam.com/api/recipes/v2/${encodeURIComponent(uri)}?type=public&app_id=${applicationID}&app_key=${applicationKey}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status:${response.status}`);
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
            console.log('getAndDisplayRecipeDetails called with URI:', uri);
            const recipe = await getRecipeDetails(uri);
            console.log('Results', recipe);
            if (recipe) {
                // Store the recipe details in local storage
                localStorage.setItem('selectedRecipe', JSON.stringify(recipe));
                // Navigate to the details page
                window.location.href = 'details.html';
            } else {
                console.error('Failed to fetch recipe details');
            }
        }
    
        // Function to restore search results from local storage
        function restoreSearchResults() {
            const searchResults = JSON.parse(localStorage.getItem('searchResults'));
            const searchQuery = localStorage.getItem('searchQuery');
            if (searchResults && searchQuery) {
                displayRecipeDetails(searchResults);
                document.getElementById('searchinput').value = searchQuery;
            }
        }
    
        // Event listener for the search form
        document.getElementById('searchform').addEventListener('submit', (event) => {
            event.preventDefault();
            const query = document.getElementById('searchinput').value;
            searchRecipeResults(query);
        });
    
        // Restore search results on page load
        window.addEventListener('load', restoreSearchResults);
    }

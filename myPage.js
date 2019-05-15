//Functionality that displays the recipes stored in the local storage key 'myRecipes'

function showRecipes() {  
    let recipes = JSON.parse(localStorage.getItem('myRecipes'));
    for (let i = 0; i < recipes.length; i++) {
        recipes[i] = new recipe(recipes[i].recipeTitle, recipes[i].recipeTime, recipes[i].recipeIngredients, recipes[i].recipeInstructions);
    }

    let html = ''
    for (let recipe of recipes) {
        html += recipe.showHTML();
    }

    document.getElementById('showRecipes').innerHTML = html

}

showRecipes()

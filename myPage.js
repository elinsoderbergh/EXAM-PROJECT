
function showRecipes() {  
    console.log('test')
    // if (localStorage.getItem('myRecipes') === null) { 
    //     recipes = []; //since it's an empty squared bracket, the stored users from local storage comes in here.
    //     localStorage.setItem('myRecipes', JSON.stringify(recipes));   
    // } else {
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
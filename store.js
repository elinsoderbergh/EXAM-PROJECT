/* we start with a variable being added a value of a function that returns all the recipes in the recipe array.
then the collected recipes gets turned into html code and displayed on the webside thrugh the for loop 
that loops though the entore array and than push the html out thrugh the id 'catalog', found on store.html */
let allRecipes = getRecipes()  

let html = ''
for (let i = 0; i < allRecipes.length; i++) {
    html += allRecipes[i].generateHTMLStructure()
}

document.getElementById('catalog').innerHTML = html

//the function ready executes as soon the the function getRecipes has executed! The function consists of multiple functions for createing a better structure.
function ready() {
    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons)
    for (let i=0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem) 
    }
/* the function in itself works but when adding the amount to the shoppingcart the quantity desent follow along. 
orginginally we wanted to adjust the recipes for the amout of persons. */
    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    let addToCartButtons = document.getElementsByClassName('btn-shop')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
  
    document.getElementsByClassName('btn-add-to-my-page')[0].addEventListener('click', addToMyPageClicked)

    if (localStorage.getItem('cartRecipes') === null) { 
        recipes = []; 
        //since it's an empty squared bracket, the stored users from local storage comes in here.
        localStorage.setItem('cartRecipes', JSON.stringify(recipes));   
    } else {
        recipes = JSON.parse(localStorage.getItem('cartRecipes'));
        for (let i = 0; i < recipes.length; i++) {
            recipes[i] = new recipe(recipes[i].recipeTitle, recipes[i].recipeTime, recipes[i].recipeIngredients, recipes[i].recipeAllergies, recipes[i].recipeInstructions);
        }
        for (let recipe of recipes) {
            recipe.createHTML();
        }
    }
    document.getElementsByClassName('btn-go-to-my-side')[0].addEventListener('click', goToMyPageClicked)
}
ready()

/* searchfunction start with a loop through all of the recipes 
searchfunction works for recipe name, ingredients and allergies */
function searchFunction()  {
    let input = document.getElementById('myinput');
    
    html = '';
    for (let recipe of allRecipes) {
        let ingredientMatches = false;
        let allergiesMatches = false;

        for (let ingredient of recipe.recipeIngredients) {
            if(ingredient.toLowerCase().includes(input.value.toLowerCase())) {
                ingredientMatches = true;
            }
        }
            for (let allergies of recipe.recipeAllergies) {
                if(allergies.toLowerCase().includes(input.value.toLowerCase())) {
                    allergiesMatches = true;
                }        
            }
        if (recipe.recipeTitle.toLowerCase().includes(input.value.toLowerCase()) || ingredientMatches || allergiesMatches ){
            html += recipe.generateHTMLStructure()
            
        } 
        searchMultipleTimes(); 
    }

}

//here starts all the function declarations that is used in the function ready ()

//function that executes when button "add to my page" is clicked
function addToMyPageClicked() {
    localStorage.setItem('myRecipes', JSON.stringify(recipes))
    localStorage.setItem('cartRecipes', JSON.stringify([]));
    alert('You have now saved a recipe to your favorites')

    let cartRecipes = document.getElementsByClassName('cart-recipes')[0]
    while (cartRecipes.hasChildNodes()) {
    cartRecipes.removeChild(cartRecipes.firstChild)
    }
}

//function that executes when button "go to my page" is clicked
function goToMyPageClicked() {
    location.assign('myPage.html')
}

//function that executes when "remove" button is clicked
function removeCartItem(event) {  
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
}

//function that regulates the quantity but not really used
function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) { //Nan = to check if the input is a number or not, and input.value <= 0 is to make sure the nu,ber added is positive
        input.value = 1 //lowest number to be able to add should be one
    }
}

//function that executes when button "add to favorites" is clicked
function addToCartClicked(event) {
    button = event.target
    let shopItem = button.parentElement.parentElement.parentElement //to grab the class/div
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerHTML
    console.log(title)
    let time = shopItem.getElementsByClassName('shop-item-time')[0].innerHTML
    let ingredients = shopItem.getElementsByClassName('shop-item-ingredients')[0].innerHTML
    let allergies = shopItem.getElementsByClassName('shop-item-allergies')[0].innerHTML
    let instructions = shopItem.getElementsByClassName('shop-item-instructions')[0].innerHTML
    addItemToCart(title, time, ingredients, allergies, instructions)
}

//function that add an item to "favorites"
function addItemToCart(title, time, ingredients, allergies, instructions) { 
    cartRecipes = document.getElementsByClassName('cart-recipes')[0]
    let cartItemNames = document.getElementsByClassName('cart-item-title')
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This recipe is already added to your page')
            return
        }
    }
    let newRecipe = new recipe(title, time, ingredients, allergies, instructions);
    recipes.push(newRecipe);
    newRecipe.createHTML();
    localStorage.setItem('cartRecipes', JSON.stringify(recipes));    
}

//this function makes the user to search for one recipe, add that ant then be able search for another recipe and add that aswell. 
function searchMultipleTimes() {
    document.getElementById('catalog').innerHTML = html
    let addToCartButtons = document.getElementsByClassName('btn-shop')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
}

let allRecipes = getRecipes()  

let html = ''
for (let i = 0; i < allRecipes.length; i++) {
    html += allRecipes[i].generateHTMLStructure()
}

document.getElementById('catalog').innerHTML = html

//change name of button
const purchaseBtn = document.getElementById('btn-add-to-my-page');

//the function ready executes as soon the the function getRecipes has executed!
function ready() {
    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons)
    for (var i=0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem) 
    }
//the function in itself works but when adding the amount to the shoppingcart the quantity desent follow along. 
//orginginally we wanted to adjust the recipes for the amout of persons.
    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('btn-shop')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
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
  //reaserch why there is a [0]
    document.getElementsByClassName('btn-go-to-my-side')[0].addEventListener('click', goToMyPageClicked)
}
ready()

//searchfunction start with a loop through all of the recipes 
//searchfunction works for recipe name, ingredients and allergies
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

function addToMyPageClicked() {
    localStorage.setItem('myRecipes', JSON.stringify(recipes))
    localStorage.setItem('cartRecipes', JSON.stringify([]));
    alert('You have now saved a recipe to your favorites')
    let cartRecipes = document.getElementsByClassName('cart-recipes')[0]
    while (cartRecipes.hasChildNodes()) {
    cartRecipes.removeChild(cartRecipes.firstChild)
    }
}

function goToMyPageClicked() {
    location.assign('myPage.html')
}

function removeCartItem(event) {  
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) { //Nan = to check if the input is a number or not, and input.value <= 0 is to make sure the nu,ber added is positive
        input.value = 1 //lowest number to be able to add should be one
    }
}

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

function addItemToCart(title, time, ingredients, allergies, instructions) {

    //CHECK: check localStorge if the key "cartRecipes" is empty or not   
    let cartRecipes = document.getElementsByClassName('cart-recipes')[0]
    var cartItemNames = document.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
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

function searchMultipleTimes() {
    document.getElementById('catalog').innerHTML = html
    let addToCartButtons = document.getElementsByClassName('btn-shop')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
}

let allRecipes = getRecipes()  

let html = ''
for (let i = 0; i < allRecipes.length; i++) {
    html += allRecipes[i].generateHTMLStructure()
}

document.getElementById('catalog').innerHTML = html


const purchaseBtn = document.getElementById('btn-purchase');

/* if the page is loading, it will run the code. ready after DOMContentLoaded is a function.
this event will fire as soon as the page is done loading 
if its not loading, which means it's ready it should fire the function 'ready' */ 
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
    } else {
        ready()
    }

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons)
    for (var i=0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem) 
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('btn-shop')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
  
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

    if (localStorage.getItem('cartRecipes') === null) { 
        recipes = []; 
        //since it's an empty squared bracket, the stored users from local storage comes in here.
        localStorage.setItem('cartRecipes', JSON.stringify(recipes));   
    } else {
        recipes = JSON.parse(localStorage.getItem('cartRecipes'));
        for (let i = 0; i < recipes.length; i++) {
            recipes[i] = new recipe(recipes[i].recipeTitle, recipes[i].recipeTime, recipes[i].recipeIngredients, recipes[i].recipeAllargies, recipes[i].recipeInstructions);
        }
        for (const recipe of recipes) {
            recipe.createHTML();
        }
    }
  
    document.getElementsByClassName('btn-go-to-my-side')[0].addEventListener('click', goToMySideClicked)

}

//searchfunction start with a loop through all of the recipes 
//searchfunction works for recipe name, ingredients and allargies
function searchFunction()  {
    let input = document.getElementById('myinput');
    let filter = input.value.toUpperCase();
    let ul = document.getElementById('catalog');
    
    html = '';
    for (let recipe of allRecipes) {
        let ingredientMatches = false;
        let allargiesMatches = false;

        for (let ingredient of recipe.recipeIngredients) {
            if(ingredient.toLowerCase().includes(input.value.toLowerCase())) {
                ingredientMatches = true;
            }
        }
            for (let allargies of recipe.recipeAllargies) {
                if(allargies.toLowerCase().includes(input.value.toLowerCase())) {
                    allargiesMatches = true;
                }        
            }
        if (recipe.recipeTitle.toLowerCase().includes(input.value.toLowerCase()) || ingredientMatches || allargiesMatches ){
            html += recipe.generateHTMLStructure()
            
        } 
    document.getElementById('catalog').innerHTML = html
    let addToCartButtons = document.getElementsByClassName('btn-shop')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
        }

    }
}

function purchaseClicked() {
        localStorage.setItem('myRecipes', JSON.stringify(recipes))
        localStorage.setItem('cartRecipes', JSON.stringify([]));
        alert('You have now added a recipe to your shopping list')
        var cartRecipes = document.getElementsByClassName('cart-recipes')[0]
        while (cartRecipes.hasChildNodes()) {
        cartRecipes.removeChild(cartRecipes.firstChild)
    }
}

function goToMySideClicked() {
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
    let allargies = shopItem.getElementsByClassName('shop-item-allargies')[0].innerHTML
    let instructions = shopItem.getElementsByClassName('shop-item-instructions')[0].innerHTML
    addItemToCart(title, time, ingredients, allargies, instructions)
}

function addItemToCart(title, time, ingredients, allargies, instructions) {

    //CHECK: check if localStorge for the key "cartRecipes" is empty or not   
    let cartRecipes = document.getElementsByClassName('cart-recipes')[0]
    var cartItemNames = document.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    let newRecipe = new recipe(title, time, ingredients, allargies, instructions);
    recipes.push(newRecipe);
    newRecipe.createHTML();
    localStorage.setItem('cartRecipes', JSON.stringify(recipes));    
}


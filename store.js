let allRecipes = getRecipes()  

let html = ''
for (let i = 0; i < allRecipes.length; i++) {
    html += allRecipes[i].generateHTMLStructure()
}

document.getElementById('catalog').innerHTML = html


var input;
var filter; 
var ul;
var button;
var shopItem = ""
var title = ""
var time = ""
var ingredients = ""
// var amount = "" --> i should create this variable to be able to change quantity
const purchaseBtn = document.getElementById('btn-purchase');




/* if the page is loading, it will run the code. ready after DOMContentLoaded is a function.
this event will fire as soon as the page is done loading 
if its not loading, which means it's ready it should fire the function 'ready' */ 
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

var recipes;
function ready() {
    var removeCartItemButtons = document.getElementsByClassName('remove-cart-btn')
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
            recipes[i] = new recipe(recipes[i].recipeTitle, recipes[i].recipeTime, recipes[i].recipeIngredients, recipes[i].recipeID);
        }
        for (const recipe of recipes) {
            recipe.createHTML();
        }
    }
  
    document.getElementsByClassName('btn-go-to-my-side')[0].addEventListener('click', goToMySideClicked)

}

function searchFunction()  {
    input = document.getElementById('myinput');
    filter = input.value.toUpperCase();
    ul = document.getElementById('catalog');
    
    html = '';
    for (let recipe of allRecipes) {
        let ingredientMatches = false;

        for (let ingredient of recipe.recipeIngredients) {
            if(ingredient.toLowerCase().includes(input.value.toLowerCase())) {
                ingredientMatches = true;
            }
            
        }
        if (recipe.recipeTitle.toLowerCase().includes(input.value.toLowerCase()) || ingredientMatches ){
            html += recipe.generateHTMLStructure()
            
        } 
        
    }
    document.getElementById('catalog').innerHTML = html

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
    // recipes = JSON.parse(localStorage.getItem('cartRecipes'));
    // let html = ""
    // if ('cartRecipe' == "")
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) { //Nan = to check if the input is a number or not, and input.value <= 0 is to make sure the nu,ber added is positive
        input.value = 1 //lowest number to be able to add should be one
    }
}


function addToCartClicked(event) {
    button = event.target
    // console.log(button)
    shopItem = button.parentElement.parentElement.parentElement //to grab the class/div
    // console.log(shopItem)
    title = shopItem.getElementsByClassName('shop-item-title')[0].innerHTML
    console.log(title)
    time = shopItem.getElementsByClassName('shop-item-time')[0].innerHTML
    ingredients = shopItem.getElementsByClassName('shop-item-ingredients')[0].innerHTML

    //amount = shopItem...

 //   imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src 
    addItemToCart(title, time, ingredients)
    
    //addItemToCart(title, time, imageSrc)
}

function addItemToCart(title, time, ingredients) {
//CHECK: check if localStorge for cartRecipes is empty or not   
    cartRecipes = document.getElementsByClassName('cart-recipes')[0]
    var cartItemNames = document.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            // alert('This item is already added to the cart')
            return
        }
    }
    let newRecipe = new recipe(title, time, ingredients, );
    recipes.push(newRecipe);
    newRecipe.createHTML();
    localStorage.setItem('cartRecipes', JSON.stringify(recipes));

    
//     CHECK: save cartRecipes to local Storage

    
    }


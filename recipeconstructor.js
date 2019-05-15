/* creating a class early stage because we will use the properties several times. */
class recipe {

    constructor(recipeTitle, recipeTime, recipeIngredients, recipeAllergies, recipeInstructions) {

        this.recipeTitle = recipeTitle;
        this.recipeTime = recipeTime;
        this.recipeIngredients = recipeIngredients;
        this.recipeAllergies = recipeAllergies;
        this.recipeInstructions = recipeInstructions;
    }

//all these three are methods of the class recipe, then need to be in the same function as the constructor to be able to work
    generateHTMLStructure() {
        return  `
        <div class='shop-item'>
                <div>
                    <span class='shop-item-title'>${this.recipeTitle}</span> 
                </div>

                <div>
                    <span class='shop-item-time'>${this.recipeTime + ' min'}</span>
                <div>
                    <span class='shop-item-ingredients'>${'Ingredients: ' + this.recipeIngredients}</span>
                </div>

                <div>
                    <span class='shop-item-allergies'></span>
                </div>

                <div>
                    <span class='shop-item-instructions'>${'Instructions: ' + this.recipeInstructions}</span>
                </div>
                
                <div class='cart-column'>
                    <input class='cart-quantity-input' type='number' value='1'> 
                        <button class='btn-shop' type='button'>ADD TO FAVORITES</button>       
                </div>
        </div>`
    }

    /* createHTML creates a block of code under the headline Favorites and when the button 'add to favorites' is clicked 
    inin generateHTMlStructure, the block gets visible.*/
    createHTML() {    
        let cartRecipes = document.getElementsByClassName('cart-recipes')[0]
        let cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
    
        let cartRowContents = `
        <div class="cart-column"></div>
            <div>${this.recipeTitle}</div>
            <div>${this.recipeTime}</div>
            <div>${this.recipeIngredients}</div>
            <div class="cart-column">
            <button class="btn-danger" type="button">REMOVE</button>
        </div>`

        cartRow.innerHTML = cartRowContents
        cartRecipes.append(cartRow)
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)

    }

//displaying the recipes saved in local storage key 'myRecipes' on 'myPage'
    showHTML() { 
        return `
        <div class='showRecipes'>
            <div>
                <h3>${this.recipeTitle}</h3>  
            </div>             
            <div>
                ${'Time: ' + this.recipeTime}
            </div>
            <div>
                ${this.recipeIngredients}
            </div>
            <div>
                ${this.recipeAllergies}</li>
            </div>
        </div>`
    }

}

/* this function executes in the top of store.js to directly show the recipes on the websites
the function contains all our recipes. */ 
function getRecipes() { 
recipes =
    [new recipe(
        'Pasta Bolognese',
        20,
        ['tomato sauce', 'pasta', 'minced meat', 'onion', 'red wine', 'salt', 'pepper', 'garlic'],
        [''],
        'Boil pasta, mix the rest in a pan, add some salt and peppar.'),
    new recipe(
        'Vegetarian Pie',
        40,
        ['flour', 'butter', 'salt', 'spinach', 'ricotta', 'egg', 'parmesan', 'pepper'],
        ['Vegetarian'],
        'Make the pie dough, fill with vegetables, add some salt and pepper'),
    new recipe(
        'Fish Soup',
        40,
        ['salmon', 'cod', 'fennel', 'leek', 'saffron', 'curry', 'oatmilk'],
        ['Gluten free'],
        'Chop fish and vegetables, add some spices and it is done'),
    new recipe(
        'Poké Bowl',
        15,
        ['rice', 'tofu', 'edamame', 'red onion', 'radish', 'ginger', 'soya'],
        ['Gluten free', 'Vegetarian'],
        'Boil rice, chop vegetables, fry tofu and but everything together in a bowl')
    ]

return recipes

}

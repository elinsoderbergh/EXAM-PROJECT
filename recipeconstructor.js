//r
class recipe {

    constructor(recipeTitle, recipeTime, recipeIngredients, recipeAllargies, recipeInstructions) {

        this.recipeTitle = recipeTitle;
        this.recipeTime = recipeTime;
        this.recipeIngredients = recipeIngredients;
        this.recipeAllargies = recipeAllargies;
        this.recipeInstructions = recipeInstructions;
    }

    //all these three are methods of the class recipe, then need to be in the same function as the constructor!!
    generateHTMLStructure() {
        return  `
        <div class="shop-item">
                <div>
                    <span class="shop-item-title">${this.recipeTitle}</span> 
                </div>              
                <div>
                    <span class="shop-item-time">${this.recipeTime + ' min'}</span>
                <div>
                    <span class="shop-item-ingredients">${'Ingredients: ' + this.recipeIngredients}</span>
                </div>
                <div>
                    <span class="shop-item-allargies"></span>
                </div>
                <div>
                    <span class="shop-item-instructions">${'Instructions: ' + this.recipeInstructions}</span>
                </div>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="1"> 
                
            <button class="btn btn-primary btn-shop" type="button">ADD TO SHOPPING LIST</button>       
        </div>
    </div>`
    }

    createHTML() {    
        var cartRecipes = document.getElementsByClassName('cart-recipes')[0]
        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
    
        var cartRowContents = `
        <div class="cart-column">
            <span class="cart-item-title">${this.recipeTitle}</span>
        </div>
            <span class="cart-column">${this.recipeTime}</span>
            <div><span class="shop-item-ingredients">${this.recipeIngredients}</span></div>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`

        cartRow.innerHTML = cartRowContents
        cartRecipes.append(cartRow)
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
        // cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

    }
    
    showHTML() { 
        return `
        <div class="showRecipes">
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
                ${this.recipeAllargies}</li>
            </div>
        </div>`
    }

}


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







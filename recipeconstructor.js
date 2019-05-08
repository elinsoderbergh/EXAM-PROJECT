
class recipe {

    constructor(recipeTitle, recipeTime, recipeIngredients, recipeID, recipeAl) {
  
        this.recipeTitle = recipeTitle;
        this.recipeTime = recipeTime;
        this.recipeIngredients = recipeIngredients;  
        this.recipeID = recipeID;
        this.recipeAllargies = recipeAl;
       // this.recipeImage = recipeImage;
    }


generateHTMLStructure() { 
    return `<div class="shop-item">
    <span class="shop-item-title">${this.recipeTitle}</span>               
        <div class="shop-item-details">
            <span class="shop-item-time">${this.recipeTime}</span>
            <div>
            <span class="shop-item-ingredients">${this.recipeIngredients}</span></div>
            <div>
            <span class="shop-item-ingredients">${this.recipeID}</span></div>
                <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <!-- <button class="btn btn-danger" type="button">REMOVE</button> -->
                <button class="btn btn-primary btn-shop" type="button">ADD TO SHOPPING LIST</button>
                </div>       
        </div>
</div>`
    }



createHTML() {    
        var cartRecipes = document.getElementsByClassName('cart-recipes')[0]
        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
    
        var cartRowContents = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${this.recipeTitle}</span>
        </div>
            <span class="cart-price cart-column">${this.recipeTime}</span>
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
    
}

function getRecipes() { 
    recipes; { 
    return recipes 
    }
}

recipes =
    [new recipe(
            'Pasta B',
            20, 
            ['tomato sauce', 'pasta', 'minced meat', 'onion', 'red wine', 'salt', 'pepper', 'garlic'],
            'id1',
            'Gluten'),
    new recipe(
            'Veg Pie',
            40,
            ['flour', 'butter', 'salt', 'spinach', 'ricotta', 'egg', 'parmesan', 'pepper'],
            'id2',
            'Vegetarian'),
    new recipe(
            'Fish Soup',
            40,
            ['salmon', 'cod', 'fennel', 'leek', 'saffron', 'curry', 'oatmilk'],
            'id3'),
    new recipe(
            'Pokébowl', 
            15, 
            ['rice', 'tofu', 'edamame', 'red onion', 'radish', 'ginger', 'soya'],
            'id4') 
]











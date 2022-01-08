const searchBtn = document.querySelector('#search-btn');

const mealList = document.querySelector('#meal');
const mealDetailsContent = document.querySelector('.meal-details-content');

const closeBtn = document.querySelector('#close-btn');

const menuUp = document.querySelector('.menuBar');
const menuBtn = document.querySelector('.hamburger');



searchBtn.addEventListener('click', getMealList);

mealList.addEventListener('click', getMealRecipe);




menuBtn.addEventListener('click', e => {
    e.stopPropagation();
    menuBtn.classList.toggle('open');
    menuUp.classList.toggle('openUp');
});



function scroll() {
    window.scrollTo(0, 320);
}
document.onclick = e => {
    
    e.preventDefault();

    if (
        e.target.className !== 'menuBar openUp' &&
        e.target.className !== 'hamburger' &&
        e.target.className !== 'ham-btn' &&
        e.target.className !== 'menuBar-top' &&
        e.target.className !== 'menuBar-bottom' &&
        e.target.className !== 'link' &&
        e.target.className !== 'menuBar-btn-2' &&
        e.target.id !== 'menuBar-btn'
        
    ) {
        menuUp.classList.remove('openUp');
        menuBtn.classList.remove('open');
        // menuBtn.removeEventListener('click',true);
    }
};




async function getMealList() {
    
    let searchInputTxt = document.getElementById('searchbar-main').value.trim();
    let searchInputTxt2 = document.getElementById('search-area').value.trim();
        if(searchInputTxt === ""){
            return
       
        }
   
    const response = await fetch(
        `https://themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
    );
    const data = await response.json();
    scroll();

    console.log(data);

    let html = '';
    
    if (data.meals) {
        data.meals.forEach(meal => {
           

            html += `
            
            <div class="meal-item" data-id ="${meal.idMeal}">
            <div class="meal-img">
                <img src="${meal.strMealThumb}"
                    alt="food">
            </div>

            <div class="meal-name">
                <h3> ${meal.strMeal}</h3>
                <a href="#" class="recipe-btn">Get Recipe Btn</a>
            </div>
            </div>
            `;
        });
        mealList.classList.remove('notFound');
    } else {
        html = `We're sorry, but we couldn't locate your food ingredient.`;
        mealList.classList.add('notFound');
    }

   
    mealList.innerHTML = html;
}

// get meal recipe

async function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        // console.log(mealItem);
        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
        );
        const data = await response.json();
        mealRecipeModal(data.meals);
    }
}

// create a modal

function mealRecipeModal(meal) {
    console.log(meal[0]);
    meal = meal[0];

    let html = `
            <h2 class = "recipe-title"> ${meal.strMeal} </h2>
            <p class = "recipe-category">${meal.strCategory}</p>
            <div class = "recipe-instruction">
                <h3>Instructions</h3>
                <p>${meal.strInstructions}</p>
            </div>
            <div class="recipe-meal-img">
                <img id="recipe-img"src="${meal.strMealThumb}"
                    alt="">
            </div>
            <div class = "recipe-btn">
            <a href="${meal.strYoutube}" target ="_blank"> Watch Video </a>
            </div> 
     `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

// close button

closeBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


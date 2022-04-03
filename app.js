
//search and get food data

const getFoodName = item => {
  const foodInfo = document.getElementById("food-name").value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayFood(data, foodInfo))
    .catch(err => alert('data not found!'));
};

// addEventListener to button, read value and set alert

document.getElementById("submit").addEventListener("click", function () {
  const foodInfo = document.getElementById("food-name").value;
    if(foodInfo){
      const noMeal = document.getElementById("no-meal");
      noMeal.innerText = ``;

      const foods = document.getElementById("foods");
      foods.innerHTML = ``;

      const detailsFood = document.getElementById("food-details");
      detailsFood.innerHTML = ``;
      
      getFoodName(foodInfo);
    }
    else{
      const noMeal = document.getElementById("no-meal");
      noMeal.innerText = `Please enter a meal name!`;
    }
  
});

// filter and show food info, set alert for wrong input

const displayFood = (item, foodInfo) => {
    const foods = document.getElementById("foods");
    const items = item.meals;

    if(items){
      items.forEach(food => {
        const foodDiv = document.createElement("div");
        foodDiv.className = "foodDiv";
        foodDiv.innerHTML = `
          <div onclick="foodDetails(${food.idMeal})" class="card" style="width: 20rem;">
          <img src="${food.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
          <h5 class="card-title"> ${food.strMeal} </h5>
              <p class="card-text"></p>
          </div>
      </div>
          `;
        foods.appendChild(foodDiv);
      });
      document.getElementById('foods').value = '';
    }
    else{
      const noMeal = document.getElementById("no-meal");
      noMeal.innerText = `Wrong Input! ${foodInfo} is not a meal.`;
    }
    
};

// fetching food details info by foodId

const foodDetails = foodId => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;
  fetch(url)
    .then(res => res.json())
    .then(data => ingredientInfo(data))
    .catch(err => alert('data not found!'));
};

//filter and display food ingredient Info & inject into div

const ingredientInfo = (ingredients) => {
  const detailsFood = document.getElementById("food-details");
  const item = ingredients.meals[0];
  detailsFood.innerHTML = `
      <div class="card" style="width: 470px;">
      <img src="${item.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h2 class="card-title"> ${item.strMeal} </h2>
        <h5 class="card-text">Ingredients </h5> 
      </div>
    <ul class="list-group list-group-flush" id="foodList">
    </ul>
</div>
  `;
  const ul = document.getElementById("foodList");

  for (let i = 1; item[`strIngredient` + i]; i++) {
    const ingredient = `strIngredient` + i;
    const li = document.createElement("li");
    li.className = `list-item`;
    li.innerHTML = `
      ${item[ingredient]} ${item[`strMeasure`+i]}
    `;
    ul.appendChild(li);
  }
};

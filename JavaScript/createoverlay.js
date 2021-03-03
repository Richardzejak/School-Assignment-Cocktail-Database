async function createOverlay(id) {
  let myDrink = await fetchById(id);

  let headline = document.getElementById("headLine");
  headline.className = "iListHeadLine";
  headline.innerHTML = "";
  headline.innerText = myDrink.name;

  let photoColumn = document.getElementById("imageColumn");
  photoColumn.innerHTML = "";
  let drinkImage = document.createElement("img");
  drinkImage.className = "img-fluid";
  drinkImage.src = myDrink.photo;
  photoColumn.appendChild(drinkImage);

  let instructionColumn = document.getElementById("instructions");
  instructionColumn.innerHTML = "";
  instructionColumn.innerText = myDrink.instructions;

  let ingredientList = document.getElementById("iList");
  ingredientList.innerHTML = "";

  if (myDrink.ingredients != "No information found.") {
    myDrink.ingredients.forEach((element) => {
      let point = document.createElement("li");
      point.innerText = element[1] + ": " + element[0];
      ingredientList.appendChild(point);
    });
  } else {
    ingredientList.innerHTML = "No information found.";
  }
}

/*OVERLAY*/

/* Open when someone clicks on the span element */
function openNav(event) {
  document.getElementById("myNav").style.width = "100%";
  createOverlay(event.target.id);
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

/*Function for fetching all the necessary data for the overlay*/
async function fetchById(id) {
  let idUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  try {
    let res = await fetch(idUrl);
    let data = await res.json();

    let ingredientsArray = collectIngredients(data);

    let drink = {
      name: data.drinks[0].strDrink,
      photo: data.drinks[0].strDrinkThumb,
      instructions: checkInstructions(data),
      id: data.drinks[0].idDrink,
      ingredients: checkIngredients(ingredientsArray),
    };

    return drink;
  } catch (error) {
    alert("Network error.");
  }
}

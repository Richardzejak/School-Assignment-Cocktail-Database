let sidebarToggle = document.getElementById("sidebar-toggle");
let sidebar = document.getElementById("sidebar");
let contentColumn = document.getElementById("contentColumn");
let sidebarHidden = false;
const cardContainer = document.getElementById("cardContainer");

//Searchbar
let searchbar = document.getElementById("searchbar");

//Categories
let categories = [];
for (let i = 0; i < 11; i++) {
  categories.push(document.getElementById("cat" + i));
}

//ingredients
let ingredients = [];
for (let i = 0; i < 2; i++) {
  ingredients.push(document.getElementById("ing"+i));
}

//glass
let glass = [];
for (let i = 0; i < 2; i++) {
  glass.push(document.getElementById("gla"+i));
}

let url;

contentColumn.className = "box";

//sidebar toggle event
sidebarToggle.addEventListener("click", function () {
  if (sidebarHidden) {
    sidebar.style.visibility = "visible";
    contentColumn.style.paddingLeft = "144px";
    sidebarHidden = false;
  } else if (sidebarHidden == false) {
    sidebar.style.visibility = "hidden";
    contentColumn.style.paddingLeft = 0;
    sidebarHidden = true;
  }
});

//search event
searchbar.addEventListener("keyup", function(event){
  if(event.keyCode === 13){
    url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+searchbar.value;
    fetchfunction();
  }
});

//categories event
for (let i = 0; i < categories.length; i++) {
  categories[i].addEventListener("click", function (event) {
    switch (event.target.id) {
      case "cat0":
        url =
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink";
        break;
      case "cat1":
        url =
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail";
        break;
      case "cat2":
        url =
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Milk / Float / Shake";
        break;
      case "cat3":
        url =
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa";
        break;
      case "cat4":
        url =
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shot";
        break;
      case "cat5":
        url =
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Coffee / Tea";
        break;
      case "cat6":
        url =
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Homemade_Liqueur";
        break;
      case "cat7":
        url =
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Punch / Party Drink";
        break;
      case "cat8":
        url =
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Beer";
        break;
      case "cat9":
        url =
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Soft Drink / Soda";
        break;
      case "cat10":
        url =
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other/Unknown";
        break;
    }
    fetchfunction();
  });
}

//ingredients event
for (let i = 0; i < ingredients.length; i++) {
  ingredients[i].addEventListener("click", function (event){
    switch (event.target.id) {
      case "ing0":
        url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka";
        break;
        case"ing1":
        url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Lime";
        break;
    }
  fetchfunction();
  });
}

//glass event
for (let i = 0; i < glass.length; i++) {
  glass[i].addEventListener("click", function (event) {
    switch (event.target.id) {
      case "gla0":
      url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Old-fashioned glass";
      break;
      case "gla1":
      url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail glass";
      break;
    };
    fetchfunction();
  });
}

//randombutton
let randomButton = document.getElementById("randombutton").addEventListener("click", function()
{
  url="https://www.thecocktaildb.com/api/json/v1/1/random.php"
  fetchfunction();
});

/* Get data */
async function fetchfunction(){
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

   //create an array of the data objects as well as a new array for the drinks with only the properties we want
   let drinkArray = data.drinks;
   let filteredDrinks = [];

   //create objects with the properties we want and then push them into new array
   drinkArray.forEach((object) => {
      let drink = {
       name: object.strDrink,
       photo: object.strDrinkThumb,
      };
      filteredDrinks.push(drink);
   });
   console.log(filteredDrinks);

    //build the cards with the array of drink objects

   buildCard(filteredDrinks);
  });
}

//* Build cards by sending in an array of the fetch response with drinks*/
function buildCard(drinkArray) {
  cardContainer.innerHTML = "";

  drinkArray.forEach((drink) => {
    let mainColumn = document.createElement("div");

    mainColumn.className = "col-md-6 col-xl-4 mb-5";
    cardContainer.appendChild(mainColumn);

    let card = document.createElement("div");
    card.className = "card h-100 border border-dark";
    mainColumn.appendChild(card);

    let image = document.createElement("img");
    image.setAttribute("id", "myIcon");
    image.setAttribute("src", drink.photo);
    image.className = "card-img-top bg-dark";
    card.appendChild(image);

    let cBody = document.createElement("div");
    cBody.className = "card-body";
    card.appendChild(cBody);

    let title = document.createElement("h4");
    title.className = "card-title text-light";
    title.innerText = drink.name.toUpperCase();
    cBody.appendChild(title);

    let cardText = document.createElement("p");
    cardText.className = "text-light";
    cardText.innerHTML = "some more text";

    cBody.appendChild(cardText);
  });
}

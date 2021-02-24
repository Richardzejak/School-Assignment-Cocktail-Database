let sidebarToggle = document.getElementById("sidebar-toggle");
let sidebar = document.getElementById("sidebar");
let contentColumn = document.getElementById("contentColumn");
let sidebarHidden = false;
const cardContainer = document.getElementById("cardContainer");

//Categories

let categories = [];

for (let i = 0; i < 10; i++) {
  categories.push(document.getElementById("cat"+i));
}

let categoryurl;

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

for (let i=0; i<categories.length; i++)
{
categories[i].addEventListener("click", function(event){
  switch(event.target.id)
  {
    case "cat0":
      categoryurl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink"
    break;
    case "cat1":
      categoryurl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
      break;
    case "cat2":
      categoryurl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Milk \/ Float \/ Shake"
      break;
    case "cat3":
      categoryurl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa"
      break;
    case "cat4":
      categoryurl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shot"
      break;
    case "cat5":
      categoryurl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Coffee \/ Tea"
      break;
    case "cat6":
      categoryurl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Homemade_Liqueur"
      break;    
    case "cat7":
      categoryurl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Punch \/ Party Drink"
      break;    
    case "cat8":
      categoryurl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Beer"
      break;
    case "cat9":
      categoryurl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Soft Drink \/ Soda"
      break;
    case "cat10":
      categoryurl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other\/Unknown"
      break;
  } 

    fetch(categoryurl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
});
}

/* Get data */
async function getData() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
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

getData();

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
    cBody.className = "card-body bg-dark";
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

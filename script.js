let sidebarToggle = document.getElementById("sidebar-toggle");
let sidebar = document.getElementById("sidebar");
let contentColumn = document.getElementById("contentColumn");
let sidebarHidden = false;
const cardContainer = document.getElementById("cardContainer");

let saveButtons = [];

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
  ingredients.push(document.getElementById("ing" + i));
}

//glass
let glass = [];
for (let i = 0; i < 2; i++) {
  glass.push(document.getElementById("gla" + i));
}

let url;

contentColumn.className = "box";

//sidebar toggle event
sidebarToggle.addEventListener("click", function () {
  if (sidebarHidden) {
    sidebar.style.visibility = "visible";
    contentColumn.style.paddingLeft = "144px";
    document.getElementById("myNav").style.paddingLeft = "144px";
    sidebarHidden = false;
  } else if (sidebarHidden == false) {
    sidebar.style.visibility = "hidden";
    contentColumn.style.paddingLeft = 0;
    document.getElementById("myNav").style.paddingLeft = 0;
    sidebarHidden = true;
  }
});

//clear saved drinks
document
  .getElementById("clearsave")
  .addEventListener("click", function (event) {
    localStorage.clear();
  });

//search event
searchbar.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    url =
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
      searchbar.value;
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
        url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa";
        break;
      case "cat4":
        url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shot";
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
        url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Beer";
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
  ingredients[i].addEventListener("click", function (event) {
    switch (event.target.id) {
      case "ing0":
        url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka";
        break;
      case "ing1":
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
        url =
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Old-fashioned glass";
        break;
      case "gla1":
        url =
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail glass";
        break;
    }
    fetchfunction();
  });
}

//randombutton
let randomButton = document
  .getElementById("randombutton")
  .addEventListener("click", function () {
    url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    fetchfunction();
  });

let myPage = document
  .getElementById("mypage")
  .addEventListener("click", savedfunction);

/* Get data */
async function fetchfunction() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //create an array of the data objects as well as a new array for the drinks with only the properties we want
      let drinkArray = data.drinks;
      let filteredDrinks = [];

      //create objects with the properties we want and then push them into new array
      drinkArray.forEach((object) => {
        let drink = {
          name: object.strDrink,
          photo: object.strDrinkThumb,
          id: object.idDrink,
        };
        filteredDrinks.push(drink);
      });

      //build the cards with the array of drink objects

      buildCard(filteredDrinks);
    });
}

/* Get data */
async function fetchbyid(id) {
  let idUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  let res = await fetch(idUrl);
  let data = await res.json();

  let drink = {
    name: data.drinks[0].strDrink,
    photo: data.drinks[0].strDrinkThumb,
    instructions: data.drinks[0].strInstructions,
    id: data.drinks[0].idDrink,
  };

  return drink;
}

//* Build cards by sending in an array of the fetch response with drinks*/
function buildCard(drinkArray) {
  cardContainer.innerHTML = "";
  drinkArray.forEach((drink, i) => {
    let mainColumn = document.createElement("div");

    mainColumn.className = "col-md-6 col-xl-3 col-lg-4 mt-3 mb-3 cardContainer";
    cardContainer.appendChild(mainColumn);

    let card = document.createElement("div");
    card.className = "card h-100 border border-dark fadeIn";
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

    let abtBtn = document.createElement("button");
    abtBtn.className = "btn btn-primary aboutButton";
    abtBtn.innerText = "About";
    abtBtn.setAttribute("id", drink.id);
    cBody.appendChild(abtBtn);

    let saveButton = document.createElement("button");
    saveButton.className = "btn button btn-primary";
    saveButton.type = "button";
    saveButton.innerHTML = "+";
    saveButton.id = drink.id;
    saveButton.addEventListener("click", clickedSave);
    cBody.appendChild(saveButton);
    i++;
  });

  $(document).ready(function () {
    $(".aboutButton").click(function () {
      createOverlay(this.id);
    });
  });
}

function clickedSave(event) {
  fetchbyid(event.target.id);
  localStorage.setItem(`user_drinks${localStorage.length}`, event.target.id);
}

async function savedfunction() {
  cardContainer.innerHTML = "";
  for (let i = 0; i < localStorage.length; i++) {
    console.log(localStorage.getItem(`user_drinks${i}`));
    let drink = await fetchbyid(localStorage.getItem(`user_drinks${i}`));

    let mainColumn = document.createElement("div");

    mainColumn.className = "col-md-6 col-xl-3 col-lg-4 mt-3 mb-3 cardContainer";
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

    let abtBtn = document.createElement("button");
    abtBtn.className = "btn btn-primary aboutButton";
    abtBtn.innerText = "About";
    abtBtn.setAttribute("id", drink.id);
    cBody.appendChild(abtBtn);
  }
  $(document).ready(function () {
    $(".aboutButton").click(function () {
      createOverlay(this.id);
    });
  });
}

async function createOverlay(id) {
  let myDrink = await fetchbyid(id);
  console.log(myDrink);
  console.log(myDrink.name);

  let myNav = document.createElement("div");
  myNav.setAttribute("id", "myNav");
  myNav.className = "overlay d-flex justify-content-center";
  myNav.style.paddingLeft = "144px";
  cardContainer.appendChild(myNav);

  let overlayContent = document.createElement("div");
  overlayContent.className = "overlay-content";

  let row = document.createElement("div");
  row.className = "row";
  row.setAttribute("id", "overlayControl");

  let leftColumn = document.createElement("div");
  leftColumn.className = "col-4 bg-danger";
  leftColumn.innerText = "HÄR ÄR EN COLUMN";
  row.appendChild(leftColumn);

  let rightColumn = document.createElement("div");
  rightColumn.className = "col-8 bg-success";
  rightColumn.innerText = "HÄR ÄR EN COLUMN";
  row.appendChild(rightColumn);

  overlayContent.appendChild(row);

  myNav.appendChild(overlayContent);

  let closeBtn = document.createElement("a");
  closeBtn.href = "javascript:void(0)";
  closeBtn.className = "closebtn";
  closeBtn.innerText = "X";
  closeBtn.addEventListener("click", closeNav);

  myNav.appendChild(closeBtn);

  openNav();
}

/*OVERLAY*/

/* Open when someone clicks on the span element */
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

/*more build*/

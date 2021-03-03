"use strict";

let contentColumn = document.getElementById("contentColumn");
const cardContainer = document.getElementById("cardContainer");
const cList = document.getElementById("categories-list");
const iList = document.getElementById("ingredients-list");
const gList = document.getElementById("glass-list");
const searchbar = document.getElementById("searchbar");

//array that keeps track of all saved localstorage-items before clearing
//and then saves them again
let storeSaved = [];

//keeps track if drink is already saved
let existing = false;

//intial page showing
let url =
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink";

createSideBar();
fetchFunction(url);

//clear saved drinks
document.getElementById("clearsave").addEventListener("click", function () {
  localStorage.clear();
});

//search event
searchbar.addEventListener("keyup", function (event) {
  // checks if keycode 13 was pressed ("Enter")
  if (event.keyCode === 13) {
    url =
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
      searchbar.value;
    fetchFunction(url);
  }
});

//randombutton
let randomButton = document
  .getElementById("randombutton")
  .addEventListener("click", function () {
    url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    fetchFunction(url);
  });

//Button for going to mypage
let myPage = document
  .getElementById("mypage")
  .addEventListener("click", myPageFunction);

/* function for fetching data */
async function fetchFunction(searchUrl) {
  try {
    let res = await fetch(searchUrl);
    let data = await res.json();

    //create an array of the data objects as well as a new array for the drinks with only the properties we want
    let drinkArray = data.drinks;
    let filteredDrinks = [];

    if (drinkArray != null) {
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
      //error handling for if there's no matching result from search
      buildCard(filteredDrinks);
    } else {
      searchbar.value = "No result...";
      setTimeout(function () {
        searchbar.value = "";
      }, 2000);
    }
  } catch (error) {
    alert("Network Error");
  }
}

/*Error handling for if there's no instructions-data*/
function checkInstructions(data) {
  if (data.drinks[0].strInstructions == "") {
    return "No information found.";
  } else {
    return data.drinks[0].strInstructions;
  }
}

/*Error handling for if there's no ingredients-data*/
function checkIngredients(ingredientsArray) {
  if (ingredientsArray.length == 0) {
    return "No information found.";
  } else {
    return ingredientsArray;
  }
}

/*extracting the correct key and value data from fetches to
dynamically build the sidebar buttons*/
function collectIngredients(data) {
  let ingredientArray = [];
  let measureArray = [];

  for (const [key, value] of Object.entries(data.drinks[0])) {
    if (key.includes("strIngredient") && value !== null) {
      ingredientArray.push(value);
    }
  }

  for (const [key, value] of Object.entries(data.drinks[0])) {
    if (key.includes("strMeasure") && value !== null) {
      measureArray.push(value);
    }
  }

  var mergedArray = [];
  for (var i = 0; i < ingredientArray.length && i < measureArray.length; i++)
    mergedArray[i] = [measureArray[i], ingredientArray[i]];

  return mergedArray;
}

//* Build cards by sending in an array of the fetch response with drinks*/
function buildCard(drinkArray) {
  cardContainer.innerHTML = "";
  drinkArray.forEach((drink, i) => {
    let mainColumn = document.createElement("div");

    mainColumn.className = "col-md-6 col-xl-3 col-lg-4 mt-3 mb-3 cardContainer";
    cardContainer.appendChild(mainColumn);

    let card = document.createElement("div");
    card.className = "card h-100 border border-0 fadeIn";
    mainColumn.appendChild(card);

    let image = document.createElement("img");
    image.setAttribute("id", "myIcon");
    image.setAttribute("src", drink.photo);
    image.className = "card-img-top bg-dark";
    card.appendChild(image);

    let cBody = document.createElement("div");
    cBody.className = "card-body text-center pb-0";
    card.appendChild(cBody);

    let title = document.createElement("h4");
    title.className = "card-title text-center mt-3";
    title.innerText = drink.name.toUpperCase();

    let abtBtn = document.createElement("button");
    abtBtn.className = "btn btn-primary aboutButton mt-2 mr-2 rounded";
    abtBtn.innerText = "About";
    abtBtn.setAttribute("id", drink.id);
    abtBtn.addEventListener("click", openNav);
    cBody.appendChild(abtBtn);

    let saveButton = document.createElement("button");
    saveButton.className =
      "btn button btn-primary bi bi-heart saveButton mt-2 ml-2 rounded";
    saveButton.type = "button";
    saveButton.innerHTML = "";
    saveButton.data = drink;
    saveButton.id = drink.id;
    for (let i = 0; i < localStorage.length; i++) {
      if (JSON.parse(localStorage.getItem(`user_drinks${i}`)).id === drink.id) {
        saveButton.className =
          "btn button btn-primary bi bi-heart-fill saveButton mt-2 ml-2 rounded";
      }
    }
    saveButton.addEventListener("click", clickedSave);
    cBody.appendChild(saveButton);
    cBody.appendChild(title);

    i++;
  });
}

/* Function for saving a drink to mypage*/
function clickedSave(event) {
  let storedValues = {
    name: event.target.data.name,
    id: event.target.data.id,
    photo: event.target.data.photo,
  };
  // checks if the item already exist in localstorage
  existing = false;
  for (let i = 0; i < localStorage.length; i++) {
    if (
      event.target.data.id ===
      JSON.parse(localStorage.getItem(`user_drinks${i}`)).id
    ) {
      existing += true;
    } else {
      existing += false;
    }
  }

  // if item does not already exist in localstorage, localstorage will save the drink, which needs to be stringified due to localStorage rules
  if (existing == false) {
    localStorage.setItem(
      `user_drinks${localStorage.length}`,
      JSON.stringify(storedValues)
    );
    event.target.className =
      "btn button btn-primary bi bi-heart-fill saveButton mt-2 ml-2 rounded";
  }
}

/*building my-page*/
async function myPageFunction() {
  // clears all cards
  cardContainer.innerHTML = "";
  // loops through all items in localstorage, in case there would be a saved item with value null, it filters that away
  for (let i = 0; i <= localStorage.length; i++) {
    if (localStorage.getItem(`user_drinks${i}`) !== null) {
      let mainColumn = document.createElement("div");

      mainColumn.className =
        "col-md-6 col-xl-3 col-lg-4 mt-3 mb-3 cardContainer";
      cardContainer.appendChild(mainColumn);

      let card = document.createElement("div");
      card.className = "card h-100 border border-dark";
      mainColumn.appendChild(card);

      let image = document.createElement("img");
      image.setAttribute("id", "myIcon");
      image.setAttribute(
        "src",
        JSON.parse(localStorage.getItem(`user_drinks${i}`)).photo
      );
      image.className = "card-img-top bg-dark";
      card.appendChild(image);

      let cBody = document.createElement("div");
      cBody.className = "card-body text-center pb-0";
      card.appendChild(cBody);

      let title = document.createElement("h4");
      title.className = "card-title text-center";
      title.innerText = JSON.parse(
        localStorage.getItem(`user_drinks${i}`)
      ).name;
      cBody.appendChild(title);

      let abtBtn = document.createElement("button");
      abtBtn.className =
        "btn btn-primary aboutButton text-center mt-2 mr-3 rounded";
      abtBtn.innerText = "About";
      abtBtn.addEventListener("click", openNav);
      abtBtn.setAttribute(
        "id",
        JSON.parse(localStorage.getItem(`user_drinks${i}`)).id
      );
      cBody.appendChild(abtBtn);

      let delBtn = document.createElement("button");
      delBtn.className =
        "btn btn-primary deleteButton bi bi-trash-fill text-center mt-2 ml-3 rounded";
      delBtn.innerText = "";
      delBtn.id =
        ("id", JSON.parse(localStorage.getItem(`user_drinks${i}`)).id);
      cBody.appendChild(delBtn);
      delBtn.addEventListener("click", deleteFunction);
    }
  }

  // function for deleting drinks from localStorage
  function deleteFunction() {
    let n = 0;
    storeSaved = [];

    /* loops through all saved items in localstorage and stores them all in a array "storeSaved", except the drink that was pressed delete on */
    for (let i = 0; i < localStorage.length; i++) {
      if (
        JSON.parse(localStorage.getItem(`user_drinks${i}`)).id ===
        event.target.id
      ) {
      } else {
        storeSaved[n] = {
          name: JSON.parse(localStorage.getItem(`user_drinks${i}`)).name,
          id: JSON.parse(localStorage.getItem(`user_drinks${i}`)).id,
          photo: JSON.parse(localStorage.getItem(`user_drinks${i}`)).photo,
        };
        n++;
      }
    }
    /* clears all items in localStorage and then saves all the items that was stored in "storeSaved" before the clear was initiated */
    localStorage.clear();

    for (let i = 0; i < storeSaved.length; i++) {
      localStorage.setItem(`user_drinks${i}`, JSON.stringify(storeSaved[i]));
    }
    // refreshes mypage to visualise that an item was deleted
    myPageFunction();
  }
}

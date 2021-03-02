let sidebarToggle = document.getElementById("sidebar-toggle");
let sidebar = document.getElementById("sidebar");
let contentColumn = document.getElementById("contentColumn");
let sidebarHidden = false;
const cardContainer = document.getElementById("cardContainer");
const cList = document.getElementById("categories-list");

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

createSideBar();

let storeSaved = [];
let existing = false;

let url =
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink";

fetchfunction(url);

//sidebar toggle event
sidebarToggle.addEventListener("click", function () {
  if (sidebarHidden) {
    sidebar.style.visibility = "visible";
    contentColumn.style.paddingLeft = "144px";
    if (document.getElementById("myNav")) {
      document.getElementById("myNav").style.paddingLeft = "144px";
    }
    sidebarHidden = false;
  } else if (sidebarHidden == false) {
    sidebar.style.visibility = "hidden";
    contentColumn.style.paddingLeft = 0;
    if (document.getElementById("myNav")) {
      document.getElementById("myNav").style.paddingLeft = 0;
    }

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
    fetchfunction(url);
  }
});

async function createSideBar() {
  let catUrl = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
  let res = await fetch(catUrl);
  let data = await res.json();
  let cName = "";
  let searchUrl = "";
  console.log(data);

  for (let i = 0; i < data.drinks.length; i++) {
    if (data.drinks[i].strCategory) {
      /*<li><button type="button" name="" id="cat0" class="btn btn-block submenuBtn">Ordinary Drinks</button></li>*/
      let li = document.createElement("li");
      let btn = document.createElement("button");
      btn.className = "btn btn-block submenuBtn";
      btn.innerText = data.drinks[i].strCategory;
      btn.setAttribute("id", `cat${i}`);
      btn.addEventListener("click", function () {
        cName = btn.innerText;
        searchUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${cName}`;
        console.log(searchUrl);
        fetchfunction(searchUrl);
      });

      li.appendChild(btn);
      cList.appendChild(li);
    }
  }

  let ingredientsUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
  res = await fetch(ingredientsUrl);
  data = await res.json();

  console.log(data);
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
  .addEventListener("click", mypagefunction);

/* Get data */
async function fetchfunction(searchUrl) {
  let res = await fetch(searchUrl);
  let data = await res.json();

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
}

/* Get data */
async function fetchbyid(id) {
  let idUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  let res = await fetch(idUrl);
  let data = await res.json();
  console.log(data);

  let ingredientsArray = collectIngredients(data);
  console.log(ingredientsArray);

  let drink = {
    name: data.drinks[0].strDrink,
    photo: data.drinks[0].strDrinkThumb,
    instructions: data.drinks[0].strInstructions,
    id: data.drinks[0].idDrink,
    ingredients: ingredientsArray,
  };

  return drink;
}

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

  console.log(ingredientArray);
  console.log(measureArray);

  var mergedArray = [];
  for (var i = 0; i < ingredientArray.length && i < measureArray.length; i++)
    mergedArray[i] = [measureArray[i], ingredientArray[i]];

  console.log(mergedArray);

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
    card.className = "card h-100 border border-dark fadeIn";
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
    title.className = "card-title text-center";
    title.innerText = drink.name.toUpperCase();
    cBody.appendChild(title);

    let abtBtn = document.createElement("button");
    abtBtn.className = "btn btn-primary aboutButton mt-2 mr-3 rounded";
    abtBtn.innerText = "About";
    abtBtn.setAttribute("id", drink.id);
    abtBtn.addEventListener("click", openNav);
    cBody.appendChild(abtBtn);

    let saveButton = document.createElement("button");
    saveButton.className =
      "btn button btn-primary bi bi-heart-fill saveButton mt-2 ml-3 rounded";
    saveButton.type = "button";
    saveButton.innerHTML = "";
    saveButton.data = drink;
    saveButton.id = drink.id;
    saveButton.addEventListener("click", clickedSave);
    cBody.appendChild(saveButton);
    i++;
  });
}

function clickedSave(event) {
  let storedValues = {
    name: event.target.data.name,
    id: event.target.data.id,
    photo: event.target.data.photo,
  };
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

  if (existing == false) {
    localStorage.setItem(
      `user_drinks${localStorage.length}`,
      JSON.stringify(storedValues)
    );
  } else {
    alert("Drink already saved");
  }
}

async function mypagefunction() {
  cardContainer.innerHTML = "";
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
      delBtn.addEventListener("click", function (event) {
        let n = 0;
        storeSaved = [];

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

        localStorage.clear();

        for (let i = 0; i < storeSaved.length; i++) {
          localStorage.setItem(
            `user_drinks${i}`,
            JSON.stringify(storeSaved[i])
          );
        }
        mypagefunction();
      });
    }
  }
}

async function createOverlay(id) {
  let myDrink = await fetchbyid(id);
  console.log(myDrink);
  console.log(myDrink.name);

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
  myDrink.ingredients.forEach((element) => {
    let point = document.createElement("li");
    point.innerText = element[1] + ": " + element[0];
    ingredientList.appendChild(point);
  });
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

/*more build*/

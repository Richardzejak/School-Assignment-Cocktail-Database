let sidebarToggle = document.getElementById("sidebar-toggle");
let sidebar = document.getElementById("sidebar");
let contentColumn = document.getElementById("contentColumn");
let sidebarHidden = false;
const cardContainer = document.getElementById("cardContainer");

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

async function changePicture() {
  fetch("http://www.omdbapi.com/?apikey=17ce5389&t:batman")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

/* Get data */
async function getData() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
    .then((response) => response.json())
    .then((data) => {
      let name = data.drinks[0].strDrink;
      console.log(name);
    });
}

getData();

//* Build cards */

function buildGrid() {
  for (let i = 0; i < 10; i++) {
    buildCard();
  }
}

function buildCard() {
  let mainColumn = document.createElement("div");
  mainColumn.className = "col-md-6 col-xl-4 mb-5";
  cardContainer.appendChild(mainColumn);

  let card = document.createElement("div");
  card.className = "card h-100";
  mainColumn.appendChild(card);

  let image = document.createElement("img");
  image.setAttribute("id", "myIcon");
  image.setAttribute("src", "images/RB.JPG");
  image.className = "card-img-top bg-dark";
  card.appendChild(image);

  let cBody = document.createElement("div");
  cBody.className = "card-body";
  card.appendChild(cBody);

  let title = document.createElement("h4");
  title.className = "card-title";
  title.innerText = "Some title";
  cBody.appendChild(title);

  let cardText = document.createElement("p");
  cardText.innerHTML = "some more text";
  // "</br>" +
  // "Adress: " +
  // newAttraction.adress;

  cBody.appendChild(cardText);
}

buildGrid();

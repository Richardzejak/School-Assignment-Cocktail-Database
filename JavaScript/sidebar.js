let sidebarToggle = document.getElementById("sidebar-toggle");
let sidebar = document.getElementById("sidebar");
let sidebarHidden = false;

//Function for creating the sidebar dynamically
async function createSideBar() {
  //Fetches all of the categories available on the API
  let catUrl = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
  try {
    let res = await fetch(catUrl);
    let data = await res.json();
    let cName = "";
    let categoryUrl = "";

    //Loops through all of the categories in the response, then creates a button
    //with an eventlistener that in turn fetches drinks with correct category filter
    for (let i = 0; i < data.drinks.length; i++) {
      if (data.drinks[i].strCategory) {
        let li = document.createElement("li");
        let btn = document.createElement("button");
        btn.className = "btn btn-block submenuBtn";
        btn.innerText = data.drinks[i].strCategory;
        btn.setAttribute("id", `cat${i}`);
        btn.addEventListener("click", function () {
          cName = btn.innerText;
          categoryUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${cName}`;
          fetchFunction(categoryUrl);
        });

        li.appendChild(btn);
        cList.appendChild(li);
      }
    }
  } catch (error) {
    alert("Network error.");
  }

  //Creates a predetermined array because the list of ingredients
  //from the API was 100+ long, way to long for including in our sidebar.
  let ingredientsUrl = "";
  let ingredientsArray = ["Vodka", "Lime", "Whiskey", "Sugar", "Rum", "Gin"];

  //Same as for dynamically creating the categories.
  for (let i = 0; i < ingredientsArray.length; i++) {
    let li = document.createElement("li");
    let btn = document.createElement("button");
    btn.className = "btn btn-block submenuBtn";
    btn.innerText = ingredientsArray[i];
    btn.setAttribute("id", `ing${i}`);
    btn.addEventListener("click", function () {
      let iName = btn.innerText;
      ingredientsUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${iName}`;
      fetchFunction(ingredientsUrl);
    });

    li.appendChild(btn);
    iList.appendChild(li);
  }

  //Loops through all of the glasses in the response, then creates a button
  //with an eventlistener that in turn fetches drinks with correct glass filter
  let glassUrl = `https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list`;
  try {
    res = await fetch(glassUrl);
    data = await res.json();
    let gName = "";
    glassUrl = "";

    for (let i = 0; i < data.drinks.length; i++) {
      if (data.drinks[i].strGlass) {
        let li = document.createElement("li");
        let btn = document.createElement("button");
        btn.className = "btn btn-block submenuBtn";
        btn.innerText = data.drinks[i].strGlass;
        btn.setAttribute("id", `gla${i}`);
        btn.addEventListener("click", function () {
          gName = btn.innerText;
          glassUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${gName}`;
          fetchFunction(glassUrl);
        });

        li.appendChild(btn);
        gList.appendChild(li);
      }
    }
  } catch (error) {
    alert("Network Error.");
  }
}

//Adding the eventlistener to the toggle button for toggling the sidebar
//on and off.
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

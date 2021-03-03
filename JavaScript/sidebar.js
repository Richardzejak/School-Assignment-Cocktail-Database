let sidebarToggle = document.getElementById("sidebar-toggle");
let sidebar = document.getElementById("sidebar");
let sidebarHidden = false;

async function createSideBar() {
  /*Categories*/
  let catUrl = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
  let res = await fetch(catUrl);
  let data = await res.json();
  let cName = "";
  let categoryUrl = "";
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
        categoryUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${cName}`;
        console.log(categoryUrl);
        fetchFunction(categoryUrl);
      });

      li.appendChild(btn);
      cList.appendChild(li);
    }
  }

  /*Ingredients*/
  let ingredientsUrl = "";
  let ingredientsArray = ["Vodka", "Lime", "Whiskey", "Sugar", "Rum", "Gin"];

  for (let i = 0; i < ingredientsArray.length; i++) {
    let li = document.createElement("li");
    let btn = document.createElement("button");
    btn.className = "btn btn-block submenuBtn";
    btn.innerText = ingredientsArray[i];
    btn.setAttribute("id", `ing${i}`);
    btn.addEventListener("click", function () {
      let iName = btn.innerText;
      ingredientsUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${iName}`;
      console.log(ingredientsUrl);
      fetchFunction(ingredientsUrl);
    });

    li.appendChild(btn);
    iList.appendChild(li);
  }

  console.log(data);

  /*Glasses*/
  let glassUrl = `https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list`;
  res = await fetch(glassUrl);
  data = await res.json();
  let gName = "";
  glassUrl = "";
  console.log(data);

  for (let i = 0; i < data.drinks.length; i++) {
    if (data.drinks[i].strGlass) {
      /*<li><button type="button" name="" id="cat0" class="btn btn-block submenuBtn">Ordinary Drinks</button></li>*/
      let li = document.createElement("li");
      let btn = document.createElement("button");
      btn.className = "btn btn-block submenuBtn";
      btn.innerText = data.drinks[i].strGlass;
      btn.setAttribute("id", `gla${i}`);
      btn.addEventListener("click", function () {
        gName = btn.innerText;
        glassUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${gName}`;
        console.log(glassUrl);
        fetchFunction(glassUrl);
      });

      li.appendChild(btn);
      gList.appendChild(li);
    }
  }
}

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

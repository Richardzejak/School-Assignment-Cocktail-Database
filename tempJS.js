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

  /*Left column*/
  let leftColumn = document.createElement("div");
  leftColumn.className = "col-4 p-0";
  let leftColumnImageContainer = document.createElement("div");
  leftColumnImageContainer.className = "container-fluid p-0";
  let leftImage = document.createElement("img");
  leftImage.src = myDrink.photo;
  leftImage.className = "img-fluid";

  leftColumnImageContainer.appendChild(leftImage);
  leftColumn.appendChild(leftColumnImageContainer);
  row.appendChild(leftColumn);

  /*Right Column*/
  let rightColumn = document.createElement("div");
  rightColumn.className = "col-8 bg-transparent text-light";
  row.appendChild(rightColumn);

  /*Appending the row to the overlay Content*/
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

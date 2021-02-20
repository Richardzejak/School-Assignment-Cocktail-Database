let sidebarToggle = document.getElementById("sidebar-toggle");
let sidebar =  document.getElementById("sidebar");
let contentColumn =  document.getElementById("contentColumn");
let sidebarHidden = false;

sidebarToggle.addEventListener("click", function(){

if(sidebarHidden){
sidebar.style.visibility="visible";
contentColumn.style.paddingLeft="144px";
sidebarHidden=false;
}
else if(sidebarHidden==false){
sidebar.style.visibility="hidden";
contentColumn.style.paddingLeft=0;
sidebarHidden=true;
}
});

async function changePicture() {
  fetch("http://www.omdbapi.com/?apikey=17ce5389&t:batman")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

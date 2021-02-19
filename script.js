let wallpaperImage = document.getElementById("wallpaperImage");
let onclickBtn = document.getElementById("onclickBtn");

onclickBtn.addEventListener("click", changePicture);






async function changePicture(){

    fetch(
        "http://www.omdbapi.com/?apikey=17ce5389&t:batman",)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

    });
}
/*
"https://wallhaven.cc/api/v1/search?sorting=random",{ 
    method: 'GET',
    mode: 'no-cors',
    cache: 'default'
*/

    /*
let url = "https://wallhaven.cc/api/v1/search";

let response = await fetch(url, {mode:"no-cors"});

if (response.ok) { // if HTTP-status is 200-299
   get the response body (the method explained below)
  let json = await response.json();
  console.log(json);
} else {
  alert("HTTP-Error: " + response.status);
}
}

https://wallhaven.cc/api/v1/search?categories=100&purity=100&sorting=random*/
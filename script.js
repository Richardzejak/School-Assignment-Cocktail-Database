async function changePicture() {
  fetch("http://www.omdbapi.com/?apikey=17ce5389&t:batman")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

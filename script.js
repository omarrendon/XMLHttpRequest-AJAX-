const image = document.getElementById("imagen");
const nombre = document.getElementById("nombre");
const id = document.getElementById("id");
const height = document.getElementById("height");
const area = document.getElementById("area");

function consulta() {
  const menssage = prompt("Intruduzaca el numero");
  if(menssage >= 807 && menssage <= 0) {
    alert('NUMERO INVALIDO')
  }
  return menssage
}

function peticion() {
  const xhr = new XMLHttpRequest();

  function status(readyState) {
    switch (readyState) {
      case 0:
        return "UNINITIALIZED";
      case 1:
        return "LOADING";
      case 2:
        return "LOADED";
      case 3:
        return "INTERACTIVE";
      case 4:
        return "COMPLETED";
    }
  }

  console.log(status(xhr.readyState));
  xhr.onreadystatechange = function() {
    console.log(xhr.readyState, status(xhr.readyState));
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // nombre.textContent = JSON.parse(xhr.responseText)
        console.log("YES");
        render(JSON.parse(xhr.responseText));
      }
    } else {
      failRender(xhr.status);
    }
  };

  xhr.open("GET", `https://pokeapi.co/api/v2/pokemon/${consulta()}`, true);
  xhr.send();
}

function render(pokemon) {
  image.setAttribute("src", pokemon.sprites.front_default);
  nombre.textContent = pokemon.name;
  id.textContent = `ID : ${pokemon.id}`;
  height.textContent = `Height : ${pokemon.height}`;
}

function failRender(status) {
  nombre.textContent = `${status} Pokemon no encontrado`;
}

peticion();

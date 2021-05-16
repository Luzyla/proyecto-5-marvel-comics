const buttonSearch = document.getElementById("search")

const buttonNext = document.getElementById("next-page")
const showingSearch = document.getElementById("showing-search")

const searchTipo = document.getElementById("selector-tipo")
const searchOrden = document.getElementById("selector-orden")

const urlBase = "https://gateway.marvel.com/v1/public/"
const apiKey = "df980dd2c89683b6998c74dae0b8844a"
const comicsPorPagina = 20;
let paginaActual = 0;

buttonSearch.onclick = () => {
  // e.preventDefault()
  //evaluar tipo y orden + texto input
  buscador(comics, 1, nombre)
}

const definirTipo = () => {
  // searchTipo.foreach(
  //   if
  // )
}


buttonNext.onclick = () => {
  paginaActual++
  console.log("pagina actual", paginaActual)
  buscador("comics", paginaActual)
}


const buscador = (url, paginaActual) => {
  console.log("... Buscando comics...")
  fetch(`${urlBase + url}?apikey=${apiKey}&offset=${paginaActual * comicsPorPagina}`)

  .then(res => res.json())

  .then(data => {
    // console.log(data)
    comics = data.data.results
    // console.log("imagen thumbnail", url.comics.thumbnail)
    showingSearch.innerHTML = ""
    comics.map(url => {
      showingSearch.innerHTML += `
        <article class="contenedor-principal__resultados__card" class="comic" data-id="${url.id}">
          <div class="contenedor-principal__resultados__card__contenedor-img">
            <img
              src="${url.thumbnail.path}/portrait_uncanny.jpg" 
              alt="${url.descripcion}"
            />
          </div>
          <div class="contenedor-principal__resultados__card__txt">
            <p>
              ${url.title}
            </p>
          </div>
        </article>`
    });
  });
};

//PROBANDO FETCH
fetch(`${urlBase}comics?apikey=${apiKey}&offset=${paginaActual * comicsPorPagina}`)
.then(res => res.json())

.then(data => console.log("mostrame el puto fetch", data))

buscador("comics", 0);

const cardComics = (url, paginaActual, nombre) => {
    fetch(`${urlBase + url}?apikey=${apiKey}&offset=${paginaActual * comicsPorPagina}`)
    
    .then(characters => {
        //console.log(characters);
        const link = document.querySelector("#prox");
        link.href = characters.data.nombre
        const seccion = document.querySelector('section');
    
        seccion.innerHTML = '';
        characters.results.map(personajes => {
          seccion.innerHTML += `
          <article class="contenedor-principal__resultados__card">
          <div class="contenedor-principal__resultados__card__contenedor-img">
            <img
              src="${personajes.image}"
              alt="${descripcion}"
            />
          </div>
          <div class="contenedor-principal__resultados__card__txt">
            <p>
              ${nombre.card}
            </p>
          </div>
        </article>`
        
      //     <article>
      //   <div class="imagen">
      //     <img src="${personaje.image}">
      //   </div>
      //   <div class="info">
      //   <div class="nombre">
      //     <h2>${personaje.name}</h2>
      //   </div>
      //   <div class="estado">
      //     <p>${personaje.status}</p>
      //     - <p>${personaje.species}</p>
      //   </div>
      //   <div class="ubicacion">
      //     <p>Last known location:</p>
      //     <p>${personaje.location.name}</p>
      //   </div>
      //   <div class="episodio">
      //     <p>First seen in:</p>
      //     <p>${personaje.episode[0]}</p>
      //   </div>
      
      // </article>
      //   `;
        });
      });
}


console.log("holaaaaaaa");

// fetch ('https://rickandmortyapi.com/api/character/299')
// .then((data) => {
//     return data.json();
// })
// .then((info) => {
//     console.log(info);
//     const titulo = document.querySelector('h1');
//     titulo.textContent = info.name;
// });

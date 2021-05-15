const urlBase = "https://gateway.marvel.com/v1/public/"
const apiKey = "df980dd2c89683b6998c74dae0b8844a"
const comicsPorPagina = 20;
let paginaActual = 0;

const buttonNext = document.getElementById("next-page")
const showingSearch = document.getElementById("showing-search")

buttonNext.onclick = () => {
    paginaActual++
    console.log("pagina actual", paginaActual)
    buscador("comics", paginaActual, "title")
}


const buscador = (url, paginaActual, nombre) => {
    console.log("... Buscando comics...")
    fetch(`${urlBase + url}?apikey=${apiKey}&offset=${paginaActual * comicsPorPagina}`)

    .then(res => res.json())

    .then(data => {
        console.log(data)
        comics = data.data.results
        showingSearch.innerHTML = ""
        comics.map(url => {
            showingSearch.innerHTML += `<p>${url.title}</p>`
        })
    });
};

const cardComics = (url, paginaActual, nombre) => {
    fetch(`${urlBase + url}?apikey=${apiKey}&offset=${paginaActual * comicsPorPagina}`)
    
    .then(characters => {
        console.log(characters);
        const link = document.querySelector("#prox");
        link.href = characters.data.nombre
        const seccion = document.querySelector('section');
    
        seccion.innerHTML = '';
        characters.results.map(personajes => {
          seccion.innerHTML += `
        <article>
        <div class="imagen">
          <img src="${personaje.image}">
        </div>
        <div class="info">
        <div class="nombre">
          <h2>${personaje.name}</h2>
        </div>
        <div class="estado">
          <p>${personaje.status}</p>
          - <p>${personaje.species}</p>
        </div>
        <div class="ubicacion">
          <p>Last known location:</p>
          <p>${personaje.location.name}</p>
        </div>
        <div class="episodio">
          <p>First seen in:</p>
          <p>${personaje.episode[0]}</p>
        </div>
      
      </article>
        `;
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

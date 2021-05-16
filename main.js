const buttonSearch = document.getElementById("search")

const buttonNext = document.getElementById("next-page")
const showingSearch = document.getElementById("showing-search")

const searchType = document.getElementById("selector-tipo")
const searchOrder = document.getElementById("selector-orden")

const urlBase = "https://gateway.marvel.com/v1/public/"
const apiKey = "df980dd2c89683b6998c74dae0b8844a"
const comicsPorPagina = 20;
let paginaActual = 0;
let url = ""
let organized = ""

const cantidadResultados = document.getElementById("number-results")

const definirTipo = () => {
  if (searchType.value === "comics") {
    return "comics"
  }
  else {
    return "characters"
  }
}

const definirOrden = () => {
  if (searchOrder.value === "a-z") {
    return organized = "name"
  }
  else if (searchOrder.value === "z-a") {
    return organized = "-name"
  }
  else if (searchOrder.value === "mas-nuevos") {
    return organized = "modified"
  }
  else {
    return organized = "-modified"
  }
}



const buscador = (url, paginaActual, organized) => {
  console.log("... Buscando comics...")
  fetch(`${urlBase + url}?apikey=${apiKey}&offset=${paginaActual * comicsPorPagina}`)

  .then(res => res.json())

  .then(data => {
    resultados = data.data.results
    console.log("fucking fetch", data)
    showingSearch.innerHTML = ""
    let clase = url
    
    cantidadResultados.innerHTML = `${data.data.total} resultados` 
    
    resultados.map(url => {
      showingSearch.innerHTML += `
      <article class="contenedor-principal__resultados__card__${clase}" data-id="${url.id}">
        <div class="contenedor-principal__resultados__card__${clase}__contenedor-img">
          <img
            src="${url.thumbnail.path}/portrait_uncanny.jpg" 
            alt="${url.descripcion}"
          />
        </div>
        <div class="contenedor-principal__resultados__card__${clase}__txt">
          <p id="comicsTxt">
            ${url.title}
          </p>
        </div>
      </article>`
      
    });
  })

  
  // .then(data => {
  //   resultados = data.data.results
  //   const comicsTxt = document.getElementById("comicsTxt")
  //   const charactersTxt = document.getElementById("charactersTxt")
  //   resultados.map(url => {
  //     if (url === "comics") {
  //       charactersTxt.classList.add("hidden")
  //     }
  //     else {
  //       comicsTxt.classList.add("hidden")
  //     }
  // })
};


//PROBANDO FETCH
// fetch(`${urlBase}comics?apikey=${apiKey}&offset=${paginaActual * comicsPorPagina}`)
// .then(res => res.json())

// .then(data => console.log("mostrame el puto fetch", data))


buscador("characters", 0, "name");

// const cardComics = (url, paginaActual, nombre) => {
//     fetch(`${urlBase + url}?apikey=${apiKey}&offset=${paginaActual * comicsPorPagina}`)
    
//     .then(characters => {
//         //console.log(characters);
//         const link = document.querySelector("#prox");
//         link.href = characters.data.nombre
//         const seccion = document.querySelector('section');
    
//         seccion.innerHTML = '';
//         characters.results.map(personajes => {
//           seccion.innerHTML += `
//           <article class="contenedor-principal__resultados__card">
//           <div class="contenedor-principal__resultados__card__contenedor-img">
//             <img
//               src="${personajes.image}"
//               alt="${descripcion}"
//             />
//           </div>
//           <div class="contenedor-principal__resultados__card__txt">
//             <p>
//               ${nombre.card}
//             </p>
//           </div>
//         </article>`

//         });
//       });
// }


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

buttonSearch.onclick = (e) => {
  e.preventDefault()
  definirOrden()
  buscador(definirTipo(), paginaActual, organized)
  console.log(definirTipo(), paginaActual, organized)
}

buttonNext.onclick = () => {
  paginaActual++
  console.log("pagina actual", paginaActual)
  buscador(url, paginaActual)
}

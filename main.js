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

const fuckingFetch = () => {
  return `${urlBase + url}?apikey=${apiKey}&offset=${paginaActual * comicsPorPagina}&orderBy=${organized}`
}

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

    busqueda = data.data.results
    console.log("fucking fetch", data)
    showingSearch.innerHTML = ""
    let choosed = url

    cantidadResultados.innerHTML = `${data.data.total} resultados`

    const textoComics = document.getElementsByClassName("contenedor-principal__resultados__card__comics__txt")
    const textoCharacters = document.getElementsByClassName("contenedor-principal__resultados__card__characters__txt")

    busqueda.map(url => {
      showingSearch.innerHTML += `
      <article class="contenedor-principal__resultados__card__${choosed}" data-id="${url.id}">
        <div class="contenedor-principal__resultados__card__${choosed}__contenedor-img">
          <img
            src="${url.thumbnail.path}/portrait_uncanny.jpg" 
            alt="${url.descripcion}"
          />
        </div>
        <div class="contenedor-principal__resultados__card__${choosed}__txt">
          <p>${url.title || url.name}</p>
        </div>
      </article>`

    });

  
  })
};

buscador("characters", 0, "name");

console.log("holaaaaaaa");

buttonSearch.onclick = (e) => {
  // e.preventDefault()
  definirOrden()
  buscador(definirTipo(), paginaActual, organized)
  console.log(definirTipo(), paginaActual, organized)
}

buttonNext.onclick = () => {
  paginaActual++
  console.log("pagina actual", paginaActual)
  buscador(url, paginaActual)
}

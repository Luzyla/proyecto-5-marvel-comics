const buttonSearch = document.getElementById("search")
const buttonFirst = document.getElementById("first-page")
const buttonPrev = document.getElementById("prev-page")
const buttonNext = document.getElementById("next-page")
const buttonLast = document.getElementById("last-page")
const showingSearch = document.getElementById("showing-search")
const searchType = document.getElementById("selector-tipo")
const searchOrder = document.getElementById("selector-orden")
const searchLupa = document.getElementById("lupa-buscar")
const formulario = document.querySelector("form")

const urlBase = "https://gateway.marvel.com/v1/public/"
const apiKey = "df980dd2c89683b6998c74dae0b8844a"
const comicsPorPagina = 20;
let paginaActual = 0;
let url = ""
let organized = ""
let total = 0

const cantidadResultados = document.getElementById("number-results")
let paramType = "comics"
let paramOrder = "name"
let paramLupa = ""

searchOrder.addEventListener("change", (e) => {
  paramOrder = e.target.value
  console.log(paramOrder)
});

searchType.addEventListener("change", (e) => {
  paramType = e.target.value
  console.log(paramType)
});

searchLupa.addEventListener("change", (e) => {
  paramLupa = e.target.value
  console.log(paramLupa)
});

const fetchURL = (paramType, paramOrder, paramLupa) => {
  let newOrder = paramOrder
  let startWith = "title"

  if (paramType === "comics") {
    if (paramOrder === "name") {
      newOrder = "title"
    }
    if (paramOrder === "-name") {
      newOrder = "-title"
    }
  }

  if (paramType === "characters") {
    startWith = "name"
  }
  else {
    startWith = "title"
  }
  
  url2 = `${urlBase + paramType}?apikey=${apiKey}&offset=${paginaActual * comicsPorPagina}&orderBy=${newOrder}`
  if (paramLupa) {
    url2 = `${urlBase + paramType}?apikey=${apiKey}&offset=${paginaActual * comicsPorPagina}&orderBy=${newOrder}&${startWith}StartsWith=${paramLupa}`
  }
  return url2
}

const buscador = (paramType, paginaActual, paramOrder, paramLupa) => {
  const urlParametrizada = fetchURL(paramType, paramOrder, paramLupa)
  
  fetch(urlParametrizada)
  
  .then(res => res.json())

  .then(data => {
    total = data.data.total
    busqueda = data.data.results

    showingSearch.innerHTML = ""
    let choosed = `${paramType}`

    cantidadResultados.innerHTML = `${data.data.total} resultados`

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

buscador(paramType, paginaActual, paramOrder, paramLupa);

buttonFirst.onclick = () => {
  paginaActual = 0
  buscador(paramType, paginaActual, paramOrder, paramLupa)
}

buttonNext.onclick = () => {
  paginaActual++
  buscador(paramType, paginaActual, paramOrder, paramLupa)
}

buttonPrev.onclick = () => {
  paginaActual--
  buscador(paramType, paginaActual, paramOrder, paramLupa)
}

buttonLast.onclick = () => {
  const diferencia = total % comicsPorPagina
  if (diferencia > 0) {
    paginaActual = (total -(total % comicsPorPagina)) / comicsPorPagina
  }
  else {
    paginaActual = (total -(total % comicsPorPagina)) / comicsPorPagina - comicsPorPagina
  }  
  buscador(paramType, paginaActual, paramOrder, paramLupa)
}


formulario.onsubmit = (e) => {
  e.preventDefault()
}

buttonSearch.onclick = () => {
  fetchURL()
  buscador(paramType, paginaActual, paramOrder, paramLupa)
}

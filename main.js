const buttonSearch = document.getElementById("search");
const buttonFirst = document.getElementById("first-page");
const buttonPrev = document.getElementById("prev-page");
const buttonNext = document.getElementById("next-page");
const buttonLast = document.getElementById("last-page");
const showingSearch = document.getElementById("showing-search");
const searchType = document.getElementById("selector-tipo");
const searchOrder = document.getElementById("selector-orden");
const searchLupa = document.getElementById("lupa-buscar");
const formulario = document.querySelector("form");

const urlBase = "https://gateway.marvel.com/v1/public/";
const apiKey = process.env.MARVEL_API_KEY;
const ts = process.env.MARVEL_API_KEY;
const hash = process.env.MARVEL_API_KEY;

const comicsPorPagina = 20;
let paginaActual = 0;
let url = "";
let organized = "";
let total = 0;

const cantidadResultados = document.getElementById("number-results");
let paramType = "comics";
let paramOrder = "name";
let paramLupa = "";
const paramAuth = `apikey=${apiKey}&ts=${ts}&hash=${hash}`;

searchOrder.addEventListener("change", (e) => {
  paramOrder = e.target.value;
  console.log(paramOrder);
});

searchType.addEventListener("change", (e) => {
  paramType = e.target.value;
  console.log(paramType);
});

searchLupa.addEventListener("change", (e) => {
  paramLupa = e.target.value;
  console.log(paramLupa);
});

const fetchURL = (paramType, paramOrder, paramLupa, paramAuth) => {
  let newOrder = paramOrder;
  let startWith = "title";

  if (paramType === "comics") {
    if (paramOrder === "name") {
      newOrder = "title";
    }
    if (paramOrder === "-name") {
      newOrder = "-title";
    }
  }

  if (paramType === "characters") {
    startWith = "name";
  } else {
    startWith = "title";
  }

  url = `${urlBase + paramType}?${paramAuth}&offset=${
    paginaActual * comicsPorPagina
  }&orderBy=${newOrder}`;
  if (paramLupa) {
    url = `${urlBase + paramType}?${paramAuth}&offset=${
      paginaActual * comicsPorPagina
    }&orderBy=${newOrder}&${startWith}StartsWith=${paramLupa}`;
  }
  return url;
};

const buscador = (
  paramType,
  paginaActual,
  paramOrder,
  paramLupa,
  paramAuth
) => {
  const urlParametrizada = fetchURL(
    paramType,
    paramOrder,
    paramLupa,
    paramAuth
  );

  fetch(urlParametrizada)
    .then((res) => res.json())

    .then((data) => {
      total = data.data.total;
      busqueda = data.data.results;

      showingSearch.innerHTML = "";
      let choosed = `${paramType}`;

      cantidadResultados.innerHTML = `${data.data.total} resultados`;

      busqueda.map((url) => {
        showingSearch.innerHTML += `
      <article class="contenedor-principal__resultados__card__${choosed}" data-id="${
          url.id
        }">
        <div class="contenedor-principal__resultados__card__${choosed}__contenedor-img">
          <img
            src="${url.thumbnail.path}/portrait_uncanny.jpg" 
            alt="${url.descripcion}"
          />
        </div>
        <div class="contenedor-principal__resultados__card__${choosed}__txt">
          <p>${url.title || url.name}</p>
        </div>
      </article>`;
      });
    });
};

buscador(paramType, paginaActual, paramOrder, paramLupa, paramAuth);

buttonFirst.onclick = () => {
  paginaActual = 0;
  buscador(paramType, paginaActual, paramOrder, paramLupa, paramAuth);
};

buttonNext.onclick = () => {
  paginaActual++;
  buscador(paramType, paginaActual, paramOrder, paramLupa, paramAuth);
};

buttonPrev.onclick = () => {
  paginaActual--;
  buscador(paramType, paginaActual, paramOrder, paramLupa, paramAuth);
};

buttonLast.onclick = () => {
  const diferencia = total % comicsPorPagina;
  if (diferencia > 0) {
    paginaActual = (total - (total % comicsPorPagina)) / comicsPorPagina;
  } else {
    paginaActual =
      (total - (total % comicsPorPagina)) / comicsPorPagina - comicsPorPagina;
  }
  buscador(paramType, paginaActual, paramOrder, paramLupa, paramAuth);
};

formulario.onsubmit = (e) => {
  e.preventDefault();
};

buttonSearch.onclick = () => {
  fetchURL();
  buscador(paramType, paginaActual, paramOrder, paramLupa, paramAuth);
};

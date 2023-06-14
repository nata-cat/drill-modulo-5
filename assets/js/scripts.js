let todosLosPersonajes;

//Molde de los personajes para crear personajes
class Personaje {
  constructor(nombre, altura, peso, planeta) {
    this.nombre = nombre;
    this.altura = altura;
    this.peso = peso;
    this.planeta = planeta;
  }
}

//Funcion para crear el arreglo de los personajes
const obtenerPersonajes = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const personajes = [];

  for (const resultado of data.results) { //hara esto 10 veces porque la pagina trae 10 personajes por pagina
    const resultPlaneta = await fetch(resultado.homeworld);
    const planeta = await resultPlaneta.json() //aca nos da el planeta en json
    const personaje = new Personaje(resultado.name, resultado.height, resultado.mass, planeta.name); //Creamos el objeto personaje dandole un nombre, peso, alto y planeta
    personajes.push(personaje); //Le agregamos el personaje que acabamos de crear a la const personajes
  }

  return personajes; //Retornamos una lista de objetos personajes creados arrriba
};

//Funcion para generar el arreglo concatenado que usaremos para rellenar las cards
const obtenerTodosLosPersonajes = async () => {
  try {
    const urlPagina1 = "https://swapi.dev/api/people/?page=1";
    const urlPagina2 = "https://swapi.dev/api/people/?page=2";

    const personajesPagina1 = await obtenerPersonajes(urlPagina1); //Llamamos a la funcion que crea el arreglo de los primeros 10 personajes
    const personajesPagina2 = await obtenerPersonajes(urlPagina2); //Llamamos a la funcion que crea el arreglo de los 10 personajes siguientes

    todosLosPersonajes = personajesPagina1.concat(personajesPagina2); //Se asigna el valor a la funcion todosLosPersonajes que incluye una concatenación entre ambos arreglos
    
  } catch (error) {
    console.error("Ocurrió un error al obtener los personajes:", error);
  }
};

//funcion para crear las cards de los personajes
const crearCards = (inicio, fin, imagen, idContenedor) =>{
  const container = document.getElementById(idContenedor); // ID del contenedor donde se agregarán las cards
  

  if (container.childNodes.length < 6) { //Con el if nos aseguramos que solo se creen 6 cards y no más al hacer mouseover nuevamente
    
    for (let i = inicio; i <= fin; i++) {
      const personaje = todosLosPersonajes[i]; // Obtener el personaje correspondiente según el índice
      console.log(personaje);
  
      //Creamos los elementos para la card
      const contenedorTarjeta = document.createElement('div');
      contenedorTarjeta.classList.add('col-4', 'my-1');
  
      const fondoTarjeta = document.createElement('div');
      fondoTarjeta.classList.add('card', 'fondoTarjeta');
  
      const cuerpoTarjeta = document.createElement('div');
      cuerpoTarjeta.classList.add('card-body', 'row');
  
      const contenidoAvatar = document.createElement('div');
      contenidoAvatar.classList.add('d-flex', 'align-items-start');
  
      const foto = document.createElement('img');
      foto.classList.add('ps-1');
      foto.src = imagen
  
      const tituloNombre = document.createElement('h6');
      tituloNombre.classList.add('ps-2', 'pt-1', 'card-title');
      tituloNombre.textContent = personaje.nombre;
  
      const contenidoPeso = document.createElement('div');
      contenidoPeso.classList.add('col-4', 'mt-4');
  
      const tituloPeso = document.createElement('h6');
      tituloPeso.textContent = 'Peso';
  
      const pesoVariable = document.createElement('p');
      pesoVariable.classList.add('card-text');
      pesoVariable.textContent = personaje.peso;
  
      const contenidoAltura = document.createElement('div');
      contenidoAltura.classList.add('col-4', 'mt-4');
  
      const tituloAltura = document.createElement('h6');
      tituloAltura.textContent = 'Altura';
  
      const alturaVariable = document.createElement('p');
      alturaVariable.classList.add('card-text');
      alturaVariable.textContent = personaje.altura;
  
      const contenidoPlaneta = document.createElement('div');
      contenidoPlaneta.classList.add('col-4', 'mt-4');
  
      const tituloPlaneta = document.createElement('h6');
      tituloPlaneta.textContent = 'Altura';
  
      const planetaVariable = document.createElement('p');
      planetaVariable.classList.add('card-text');
      planetaVariable.textContent = personaje.planeta;
  
      //Agregamos los elementos a los div
      contenidoAvatar.appendChild(foto);
      contenidoAvatar.appendChild(tituloNombre);
  
      contenidoPeso.appendChild(tituloPeso);
      contenidoPeso.appendChild(pesoVariable);
  
      contenidoAltura.appendChild(tituloAltura);
      contenidoAltura.appendChild(alturaVariable);
  
      contenidoPlaneta.appendChild(tituloPlaneta);
      contenidoPlaneta.appendChild(planetaVariable);
  
      cuerpoTarjeta.appendChild(contenidoAvatar);
      cuerpoTarjeta.appendChild(contenidoPeso);
      cuerpoTarjeta.appendChild(contenidoAltura);
      cuerpoTarjeta.appendChild(contenidoPlaneta);
  
      fondoTarjeta.appendChild(cuerpoTarjeta);
      contenedorTarjeta.appendChild(fondoTarjeta);
  
      container.appendChild(contenedorTarjeta);
  
    }
  }

  
}

const llamarEventos = () =>{
  const rango1 = document.getElementById("personajes1");
  rango1.addEventListener("mouseenter", () => {
      crearCards(0,4,"assets/img/Redstarbird.svg","contendorTarjetas");
  });

  const rango2 = document.getElementById("personajes2");
  rango2.addEventListener("mouseenter", () => {
    crearCards(5,9,"assets/img/Republic_Emblem.png","contendorTarjetas2");
  
  });
  
  const rango3 = document.getElementById("personajes3");
  rango3.addEventListener("mouseenter", () => { 
      crearCards(10,14,"assets/img/antigua-republica.svg","contendorTarjetas3")
  
  });
}

//Funciones de textos que se van al infinito para esperar que se cargue la info de las api

// Función que oculta el loader
function ocultarLoader() {
  const main = document.getElementById("mainTarjetas");
  const loader = document.getElementById("loader");
  loader.style.display = "none"
  main.style.display = "block"
}

//Funcion asincronica que oculta el main hasta que esten todos los personajes cargados
async function ejecutarFuncionAsincrona() {
  try {
    await obtenerTodosLosPersonajes(); // Espera a que la función asíncrona termine
    
  } catch (error) {
    console.error(error); // Maneja cualquier error que ocurra durante la función asíncrona
  }

  ocultarLoader(); // Oculta el loader después de que la función asíncrona haya terminado
}
ejecutarFuncionAsincrona();
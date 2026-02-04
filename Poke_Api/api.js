//Constantes
const urlBase = "https://pokeapi.co/api/v2/pokemon/";
const inputPokemon = document.getElementById("pokemonInput");
const btnBuscarPokemon = document.getElementById("botonBuscarPokemon");
const limpiarTodo = document.getElementById("limpiarTodo");
const resultado = document.getElementById("resultado");


//------------------------------Funciones comunes---------------------------------

//Funcion para limpiar SOLO el resultado
function limpiarResultado () {
    resultado.innerHTML = "";
}

//Funcion para limpiar TODO
function limpiarAll(){
    limpiarResultado();
    inputPokemon.value = "";
}

//Funcion para pintar los datos
function pintarDatos(datos){
    resultado.innerHTML = `   
        <p>Nombre ${datos.name}</p>
        <img src="${datos.sprites.front_default}">
        <p>Peso ${datos.weight}</p>
        <p>Altura ${datos.height}</p>
        
    `;
}

//Funcion para Validar ID/Nombre
function validarNombre() {
    const input = inputPokemon.value.trim().toLowerCase();

    //Si el input está vacio devolvemos un error
    if(!input)
        return null;

    //Si el input es correcto, se pasa a minusculas y se retorna
    if(input) 
        return { ok: true, nombre: input };
}

//Funcion para errores
function setErrorMessage(msg) {
        resultado.textContent = msg;
}

//------------------------Funciones Async------------------------------

//Funcion async que devolverá los datos en formato json
async function fetchJason(urlBase) {
    const res = await fetch(urlBase) 
        //Error servidor
        if(!res.ok) {
            throw { status: res.status };
        }
        //Si hay resultado de el servidor
        return await res.json();

}

//Funcion PRINCIPAL al clicar en buscar
async function buscarPokemon() {
    //Limpiar el resultado anterior
    limpiarResultado();
    setErrorMessage("");

    //Validar el input
    const nombreValidado = validarNombre();
    if(!nombreValidado) {
        setErrorMessage("Introduce un nombre de Pokemon Válido")
        return;
    }

    //Si todo va bien, Construimos la URL con ese Nombre
    const URL = `${urlBase}${nombreValidado.nombre}`; 
    try{
        
        const datos = await fetchJason(URL)
            pintarDatos(datos);
            //setErrorMessage("ok");

    }catch(error){
        if(error.status === 404){
            setErrorMessage("No encontrado");
        return;
        }
        setErrorMessage("No se pudo conectar con la PokeApi");
    }

}

//Eventos asignados a botones:
document.getElementById("botonBuscarPokemon").addEventListener("click", buscarPokemon);
document.getElementById("limpiarTodo").addEventListener("click", limpiarAll);
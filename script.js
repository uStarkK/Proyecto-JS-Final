let darkMode, str ="holaXD";
let alumnosIngresados = [];
let guardarNotasAlumnos = [];
let promedioNotas = 0
let sumarNotas = 0
let i = 0;
const soloLetras = /^[a-zA-Z \u00f1\u00d1]+$/;
const formAlumnos = document.getElementById("añadirAlumnos");
const nombreAlumno = document.getElementById("cargarNombre")
const apellidoAlumno = document.getElementById("cargarApellido")
const edadAlumno = document.getElementById("cargarEdad")
const notaAlumno = document.getElementById("cargarNota")
const searchInput = document.getElementById("searchAlumno")
let currentAlumnos = []
darkMode = localStorage.getItem("theme") ?? "light"

guardarNotasAlumnos = JSON.parse(localStorage.getItem("notas")) ?? []
console.log(guardarNotasAlumnos)


function getData() {
    if (localStorage.getItem("alumnos")) {
        return JSON.parse(localStorage.getItem("alumnos"));
    }

    return fetch('./json/alumnos.json')
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("alumnos", JSON.stringify(data));
            data.forEach(data => alumnosIngresados.push(data))
            data.forEach(data => guardarNotasAlumnos.push(data.nota))
            data.forEach(data => renderizarAlumno(data))
            return getData();
        });
}

getData()

if(darkMode === "dark"){
    document.body.classList.add("darkMode")
}
class Alumnos {
    constructor(nombre, apellido, edad, nota) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.nota = nota;
    }
}


function validarAlumno(event) { 
    if (nombreAlumno.value === "" || edadAlumno.value === "" || notaAlumno.value === "" || apellidoAlumno.value ==="") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Looks like DEJASTE ESPACIOS EN BLANCO EN EL INPUT',
            footer: '<a href="https://youtu.be/Q5-6RxRiDck?t=3" target="_blank">Qué hará este botón?</a>'
        })
        return false
    }
    if(!soloLetras.test(nombreAlumno.value)){
        Swal.fire(
            '?',
            '? letras.',
            'question'
        )
        return false
    }
}

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase()   
}




const containerAlumnos = document.createElement("div");
document.body.appendChild(containerAlumnos);
containerAlumnos.classList.add("containerAlumnosClass")

const renderizarAlumno = (alumno) => {
    const nuevoAlumno = document.createElement("div");
    containerAlumnos.appendChild(nuevoAlumno)
    nuevoAlumno.classList.add("alumno")

    const datos = document.createElement("div")
    nuevoAlumno.appendChild(datos)
    datos.classList.add("datos_uwu")

    const nombre = document.createElement("div")
    datos.appendChild(nombre)
    nombre.innerHTML = alumno.nombre

    const apellido = document.createElement("div")
    datos.appendChild(apellido)
    apellido.innerHTML = alumno.apellido

    const edad = document.createElement("div")
    datos.appendChild(edad)
    edad.innerHTML = `${alumno.edad} años`

    const nota = document.createElement("div")
    datos.appendChild(nota)
    nota.innerHTML = `Nota: ${alumno.nota} `
}

    alumnosIngresados = JSON.parse(localStorage.getItem("alumnos")) ?? [] 
    alumnosIngresados.forEach(alumno => renderizarAlumno(alumno))




function promediarNotas(arr){ 
    containerNotas.innerHTML = ""
    const promedio = document.createElement("div")
    containerNotas.appendChild(promedio)
    for (i = 0; i < arr.length; i++) {
        sumarNotas = sumarNotas + parseInt(arr[i]);
    }
    promedioNotas = sumarNotas / arr.length;
    promedio.innerHTML = `La sumatoria de las notas es de ${sumarNotas}. El promedio de notas es de ${promedioNotas.toFixed(2)} de un total de ${guardarNotasAlumnos.length} alumnos`
}


formAlumnos.addEventListener("submit", (event) => {
    event.preventDefault();
    if(validarAlumno() == false){
        return null
    } else{
        const nuevoAlumno = new Alumnos(capitalize(nombreAlumno.value), capitalize(apellidoAlumno.value), edadAlumno.value, (notaAlumno.value));
        alumnosIngresados.push(nuevoAlumno)
        guardarNotasAlumnos.push(nuevoAlumno.nota);
        console.log(alumnosIngresados)
        renderizarAlumno(nuevoAlumno)
        formAlumnos.reset()
        localStorage.setItem("alumnos", JSON.stringify(alumnosIngresados))
        localStorage.setItem("notas", JSON.stringify(guardarNotasAlumnos))
        console.log(guardarNotasAlumnos)
    }
})

const renderizarAprobados = () =>{
    containerAlumnos.innerHTML = "";
    const alumnosAprobados = (alumnosIngresados.filter(alumnosIngresados => alumnosIngresados.nota > 5))
    alumnosAprobados.forEach(Alumnos => {renderizarAlumno(Alumnos)});
    currentAlumnos = alumnosAprobados;
}


const renderizarNoAprobados = () =>{
    containerAlumnos.innerHTML = "";
    const alumnosNoAprobados = (alumnosIngresados.filter(alumnosIngresados => alumnosIngresados.nota < 6))
    alumnosNoAprobados.forEach(Alumnos => {renderizarAlumno(Alumnos)});
    currentAlumnos = alumnosNoAprobados;
}

const mostrarAprobados = document.getElementById("mostrarAprobados");

mostrarAprobados.addEventListener("click", () =>{
    renderizarAprobados();
}) 

const mostrarNoAprobados = document.getElementById("mostrarNoAprobados");

mostrarNoAprobados.addEventListener("click", () =>{
    renderizarNoAprobados()
})
const mostrarTodos = document.getElementById("mostrarTodos")

mostrarTodos.addEventListener("click", () =>{
    containerAlumnos.innerHTML = "";
    currentAlumnos = alumnosIngresados;
    alumnosIngresados.forEach(alumno => renderizarAlumno(alumno))
})
const botonLight = document.getElementById("lightMode")
const botonDark = document.getElementById("darkMode")


botonLight.addEventListener("click", () =>{
    document.body.classList.remove("darkMode")
    localStorage.setItem("theme", "light")
})

botonDark.addEventListener("click", () =>{
    document.body.classList.add("darkMode")
    localStorage.setItem("theme", "dark")
})

const containerNotas = document.createElement("div")
document.body.appendChild(containerNotas)
containerNotas.classList.add("containerNotas")
const promedioDeNotas = document.getElementById("promediar")


promedioDeNotas.addEventListener("click", () =>{
    promediarNotas(guardarNotasAlumnos)
    Swal.fire(
        `BUENARDO EL PROMEDIO DE TUS PIBES ES DE ${promedioNotas.toFixed(2)} ` ,
        `SON RE CAPOS TUS ${guardarNotasAlumnos.length} ALUMNOS ENCIMA SUMAN ${sumarNotas} ENTRE TODOS RE EPICO`,
        'success'
    )
    sumarNotas = 0;
})

searchInput.addEventListener("keyup", e =>{
    if(currentAlumnos.length==0){
        currentAlumnos = alumnosIngresados
    }
    containerAlumnos.innerHTML = ""
    const filteredAlumno = currentAlumnos.filter(alumno => alumno.nombre.toLowerCase().includes(e.target.value.toLowerCase()) || alumno.apellido.toLowerCase().includes(e.target.value.toLowerCase()))
    filteredAlumno.forEach(alumno => renderizarAlumno(alumno))
    console.log("profe apruebeme")
})



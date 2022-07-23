let url = "http://localhost:3000";
//VARIABLES GLOBALES
let alumnosCargados;//array alumnos que viene de la coleccion
let alumnoModificar//
//ELEMENTOS
let btCerrar = document.querySelector("#bt_cerrar");
btCerrar.addEventListener("click",function(){
    localStorage.clear();
    document.querySelector("#info").style.display = "none"
    document.querySelector("#login").style.display = "block";
    alumnosCargados=[];
    fetch(`${url}/cerrar`)
        .then(respuesta=>respuesta.json())
        .then(datos=>{
            console.log(datos)
        })
    
})



let btLoguear = document.querySelector("#bt_loguear");


let txtUser = document.querySelector("#txt_user");
let txtPass = document.querySelector("#txt_pass");
//------------------------------------------------------
let btMostrar = document.querySelector("#bt_mostrar")
//------------------------------------------------------
let txtBuscar = document.querySelector("#txt_buscar")
let btBuscar = document.querySelector("#bt_buscar")
//-------------------------------------------------
let txtNombre = document.querySelector("#txt_nombre");
let txtEdad = document.querySelector("#txt_edad");
let txtProfesion = document.querySelector("#txt_profesion");
let btIngresar = document.querySelector("#bt_ingresar")
//-----------------------------------------------
let txtNombreModificar = document.querySelector("#txt_nombre"); //document.querySelector("#txt_nombre_modificar");
let txtEdadModificar = document.querySelector("#txt_edad"); //document.querySelector("#txt_edad_modificar");
let txtProfesionModificar = document.querySelector("#txt_profesion"); //document.querySelector("#txt_profesion_modificar");
let btModificarAlumno = document.querySelector("#bt_modificar_alumno")
//-----------------------------------------------
let divDatos = document.querySelector("#datos");
//EVENTOS
btMostrar.addEventListener("click", mostrarDatos);
btBuscar.addEventListener("click", buscarAlumno)
btIngresar.addEventListener("click", ingresarAlumno)
btLoguear.addEventListener("click", ingresarApp)

if (localStorage.idUsuario) {
    console.log("ya definido usuario");
    console.log(localStorage.nombreUsuario);
    document.querySelector("#info").style.display = "block"
    document.querySelector("#login").style.display = "none";

}

function ingresarApp() {
    let userIngresado = txtUser.value;
    let passIngresada = txtPass.value;
    fetch(`${url}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: userIngresado,
            pass: passIngresada
        })
    })
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos)
            if (datos.id_valido === false) {
                alert("usuario no valido")
            }
            else {
                let nombre = datos.datosUsuario.nombreUsuario;
                let id_usuario = datos.datosUsuario.id;
                //---------------------------------------
                localStorage.setItem("nombreUsuario", nombre)
                localStorage.setItem("idUsuario", id_usuario)
                //-----------------------------------------
                /* alert(`Hola ${localStorage.getItem("nombreUsuario")}`) */
                document.querySelector("#info").style.display = "block"
                document.querySelector("#login").style.display = "none"
                alumnosCargados = datos.datosAlumnos;
                mostrarAlumnos(alumnosCargados)
            }
        })
}

function getGenero()
{
    var genero = document.getElementById("genero");
    return genero.value;
}

//FUNCIONES
function mostrarAlumnos(_alumnos) 
{
    alumnosCargados = _alumnos
    divDatos.innerHTML = "";
    _alumnos.forEach(element => 
    {
        // ${element._id}
        divDatos.innerHTML += `<article class="col-md-3 mt-4">
            <h6 data-id="${element._id}"> - ${element.nombre} ${element.edad}  ${element.profesion}</h6>
            <input data-idModificar="${element._id}" type="button" class="modificar" value="Modificar">
            <input data-idEliminar="${element._id}" type="button" class="eliminar" value="Eliminar">
            </article>`
    });

    let h1s = document.querySelectorAll("#datos h1");
    h1s.forEach(element => {
        element.addEventListener("click", mostrarDatosUnAlumno)
    });
    //----------------------------------------
    let bts_modificar = document.querySelectorAll(".modificar");
    bts_modificar.forEach(element => {
        element.addEventListener("click", cargarDatosUnAlumnoModificar)
    });
    //----------------------------------------
    let bts_eliminar = document.querySelectorAll(".eliminar");
    bts_eliminar.forEach(element => {
        element.addEventListener("click", eliminarAlumno)
    });
}

//DIRECCIONAMIENTOS POR GET

//direccionamiento a la raiz
/* fetch(url)
    .then(respuesta => respuesta.text()
    )
    .then(datos => {
        divDatos.innerHTML = datos;
    }) */

//---------------------------------------------------
//http://localhost:3000/alumnos
function mostrarDatos() {
    fetch(`${url}/alumnos`)
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos);
            alumnosCargados = datos
            mostrarAlumnos(datos)
        })
}
//mostrarDatosUnAlumno()
//http://localhost:3000/alumnos/3
function mostrarDatosUnAlumno() {
    let idLevantado = this.getAttribute("data-id");
    console.log(idLevantado)
    //AMPLIACION LA HAGO EN ALUMNOSCARGADOS
 /*    fetch(`${url}/alumnos/${idLevantado}`)
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos);
            //aca vendria que muestre los datos de ese elemento den el div
        }) */
}
//buscar alumnos()
//http://localhost:3000/buscar?texto=er
function buscarAlumno() {
    let textoIngresadoBuscar = txtBuscar.value;
    console.log(textoIngresadoBuscar);
    //BUSQUEDA LA HAGO EN ALUMNOSCARGADOS
     fetch(`${url}/buscar?texto=${textoIngresadoBuscar}`)
        .then(respuesta => respuesta.json())
        .then(datos => {
            alumnosCargados = datos
            console.log(datos);
            mostrarAlumnos(datos)
            //aca vendria que muestre los datos de ese elemento den el div
        }) 
}

//DIRECCIONAMIENTO POR POST
function ingresarAlumno() {
    let nombreIngresado = txtNombre.value;
    let edadIngresada = parseInt(txtEdad.value);
    let profesionIngresada = txtProfesion.value;

    fetch(`${url}/alumnos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombreIngresado,
            edad: edadIngresada,
            profesion: profesionIngresada,
            id_Usuario:localStorage.getItem("idUsuario")
        })
    })
        .then(respuesta => respuesta.json())
        .then(datos => {
            alumnosCargados.push(datos)
            mostrarAlumnos(alumnosCargados);
        })
}
//DIRECCIONAMIENTO POR PUT
let idModificar;
function cargarDatosUnAlumnoModificar() {
    console.log(this.getAttribute("data-idModificar"))
    idModificar = this.getAttribute("data-idModificar");
    console.log(alumnosCargados);
    alumnoModificar = alumnosCargados.find(alumno => alumno._id === idModificar)
    console.log(alumnoModificar)
    txtNombreModificar.value = alumnoModificar.nombre;
    txtEdadModificar.value = parseInt(alumnoModificar.edad);
    txtProfesionModificar.value = alumnoModificar.profesion;


    //-------------------------------------------
    btModificarAlumno.addEventListener("click", modificarAlumno)
}
function modificarAlumno() {

    alumnoModificar.nombre = txtNombreModificar.value;
    alumnoModificar.edad = parseInt(txtEdadModificar.value);
    alumnoModificar.profesion = txtProfesionModificar.value
    mostrarAlumnos(alumnosCargados)
    fetch(`${url}/alumnos`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: idModificar,
            nombre: txtNombreModificar.value,
            edad: txtEdadModificar.value,
            profesion: txtProfesionModificar.value
        })
    })
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos)
        })
}
//DIRECCIONAMIENTO POR DELETE
function eliminarAlumno() {
    console.log(this.getAttribute("data-idEliminar"))
    let idEliminar = this.getAttribute("data-idEliminar");
    let posicionEliminar = alumnosCargados.findIndex(alumno => alumno._id === idEliminar);
    console.log(posicionEliminar);
    alumnosCargados.splice(posicionEliminar, 1)
    mostrarAlumnos(alumnosCargados)

    fetch(`${url}/alumnos/${idEliminar}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos);
            //mostrarAlumnos(datos)
        })
}

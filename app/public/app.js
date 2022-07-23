let url = "http://localhost:3000";
//VARIABLES GLOBALES
let content;//array content que viene de la coleccion
let contentModificar//
//ELEMENTOS
let btCerrar = document.querySelector("#bt_cerrar");
btCerrar.addEventListener("click",function(){
    localStorage.clear();
    document.querySelector("#info").style.display = "none"
    document.querySelector("#login").style.display = "block";
    content=[];
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
let txttitle = document.querySelector("#title_");
let txtyear = document.querySelector("#year_");
let txtgenero = document.querySelector("#category");
let btIngresar = document.querySelector("#bt_ingresar")
//-----------------------------------------------
let txttitleModificar = document.querySelector("#title_"); //document.querySelector("#title__modificar");
let txtyearModificar = document.querySelector("#year_"); //document.querySelector("#year__modificar");
let txtgeneroModificar = document.querySelector("#category"); //document.querySelector("#category_modificar");
let btModificarcontent = document.querySelector("#bt_modificar_content")
//-----------------------------------------------
let divDatos = document.querySelector("#datos");
//EVENTOS
btMostrar.addEventListener("click", mostrarDatos);
btBuscar.addEventListener("click", buscarcontent)
btIngresar.addEventListener("click", ingresarcontent)
btLoguear.addEventListener("click", ingresarApp)

if (localStorage.idUsuario) {
    console.log("ya definido usuario");
    console.log(localStorage.titleUsuario);
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
                let title = datos.datosUsuario.titleUsuario;
                let id_usuario = datos.datosUsuario.id;
                //---------------------------------------
                localStorage.setItem("titleUsuario", title)
                localStorage.setItem("idUsuario", id_usuario)
                //-----------------------------------------
                /* alert(`Hola ${localStorage.getItem("titleUsuario")}`) */
                document.querySelector("#info").style.display = "block"
                document.querySelector("#login").style.display = "none"
                content = datos.content;
                mostrarcontent(content)
            }
        })
}

function getGenero()
{
    var genero = document.getElementById("genero");
    return genero.value;
}

//FUNCIONES
function mostrarcontent(_content) 
{
    content = _content
    divDatos.innerHTML = "";
    _content.forEach(element => 
    {
        // ${element._id}
        divDatos.innerHTML += `<article class="col-md-12 mt-4 alert alert-secondary mx-1" style="background-color: white;">
            <h6 data-id="${element._id}"> <b><h4> ${element.title}</h4></b> ${element.year}  ${element.genero}</h6>
            <input data-idModificar="${element._id}" type="button" class="modificar form-select-sm float-end btn btn-warning" value="Modificar">
            <input data-idEliminar="${element._id}" type="button" class="eliminar form-select-sm float-end btn btn-danger" value="Eliminar">
            </article>`
    });

    let h1s = document.querySelectorAll("#datos h1");
    h1s.forEach(element => {
        element.addEventListener("click", mostrarDatosUncontent)
    });
    //----------------------------------------
    let bts_modificar = document.querySelectorAll(".modificar");
    bts_modificar.forEach(element => {
        element.addEventListener("click", cargarDatosUncontentModificar)
    });
    //----------------------------------------
    let bts_eliminar = document.querySelectorAll(".eliminar");
    bts_eliminar.forEach(element => {
        element.addEventListener("click", eliminarcontent)
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
//http://localhost:3000/content
function mostrarDatos() {
    fetch(`${url}/content`)
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos);
            content = datos
            mostrarcontent(datos)
        })
}
//mostrarDatosUncontent()
//http://localhost:3000/content/3
function mostrarDatosUncontent() {
    let idLevantado = this.getAttribute("data-id");
    console.log(idLevantado)
    //AMPLIACION LA HAGO EN content
 /*    fetch(`${url}/content/${idLevantado}`)
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos);
            //aca vendria que muestre los datos de ese elemento den el div
        }) */
}
//buscar content()
//http://localhost:3000/buscar?texto=er
function buscarcontent() {
    let textoIngresadoBuscar = txtBuscar.value;
    console.log(textoIngresadoBuscar);
    //BUSQUEDA LA HAGO EN content
     fetch(`${url}/buscar?texto=${textoIngresadoBuscar}`)
        .then(respuesta => respuesta.json())
        .then(datos => {
            content = datos
            console.log(datos);
            mostrarcontent(datos)
            //aca vendria que muestre los datos de ese elemento den el div
        }) 
}

//DIRECCIONAMIENTO POR POST
function ingresarcontent() {
    let titleIngresado = txttitle.value;
    let yearIngresada = parseInt(txtyear.value);
    let generoIngresada = txtgenero.value;

    fetch(`${url}/content`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: titleIngresado,
            year: yearIngresada,
            genero: generoIngresada,
            id_Usuario:localStorage.getItem("idUsuario")
        })
    })
        .then(respuesta => respuesta.json())
        .then(datos => {
            content.push(datos)
            mostrarcontent(content);
        })
}
//DIRECCIONAMIENTO POR PUT
let idModificar;
function cargarDatosUncontentModificar() {
    console.log(this.getAttribute("data-idModificar"))
    idModificar = this.getAttribute("data-idModificar");
    console.log(content);
    contentModificar = content.find(content => content._id === idModificar)
    console.log(contentModificar)
    txttitleModificar.value = contentModificar.title;
    txtyearModificar.value = parseInt(contentModificar.year);
    txtgeneroModificar.value = contentModificar.genero;


    //-------------------------------------------
    btModificarcontent.addEventListener("click", modificarcontent)
}
function modificarcontent() {

    contentModificar.title = txttitleModificar.value;
    contentModificar.year = parseInt(txtyearModificar.value);
    contentModificar.genero = txtgeneroModificar.value
    mostrarcontent(content)
    fetch(`${url}/content`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: idModificar,
            title: txttitleModificar.value,
            year: txtyearModificar.value,
            genero: txtgeneroModificar.value
        })
    })
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos)
        })
}
//DIRECCIONAMIENTO POR DELETE
function eliminarcontent() {
    console.log(this.getAttribute("data-idEliminar"))
    let idEliminar = this.getAttribute("data-idEliminar");
    let posicionEliminar = content.findIndex(content => content._id === idEliminar);
    console.log(posicionEliminar);
    content.splice(posicionEliminar, 1)
    mostrarcontent(content)

    fetch(`${url}/content/${idEliminar}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos);
            //mostrarcontent(datos)
        })
}

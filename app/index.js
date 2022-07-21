const mongoose = require("mongoose");
const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();

let DATABASE_URL = `mongodb+srv://entrega:entrega@cluster0.zfkhx.mongodb.net/base_clase?retryWrites=true&w=majority`; 
let userDB = process.env.DB_USER;
let passDB = process.env.DB_PASS;
const port = process.env.PORT || 3000;
 
app.use(cors());  
mongoose.connect(DATABASE_URL);  
let db = mongoose.connection;
db.once("open", () => console.log("conectado a la base"))
let Alumno = require("./models/Alumno");
let Usuario = require("./models/Usuario");
app.use(express.json()); //para poder acceder a los datos enviados por el body de post y put
 
//GET Peticiones de informacion, ENRUTAMIENTO O DIRECCIONAMIENTO
app.use("/", express.static("frontend"))

/* app.get("/", (req, res) => {
    res.send("hola entraste a la raiz");
}) */
let id_valido = false;
app.post("/", (req, res) => {
    let userRecibido = req.body.user;
    let passRecibido = req.body.pass;

    Usuario.findOne({
        user: userRecibido,
        pass: passRecibido
    }, (err, unUsuario) => {
        if (err) {
            return console.log(err)
        } else if (unUsuario === null) {
            //el usuario no es valido
            id_valido = false;
            res.json({
                id_valido: false
            })
        } else {
            id_valido = true;
            console.log(unUsuario)
            console.log(unUsuario._id);
            Alumno.find({
                id_Usuario: unUsuario._id
            }, (err, alumnos) => {
                if (err) {
                    return console.log(err)
                } else {
                    console.log(alumnos)
                    res.json({
                        datosUsuario: {
                            id_valido: true,
                            id: unUsuario._id,
                            nombreUsuario: unUsuario.user
                        },
                        datosAlumnos: alumnos
                    })
                }
            })

        }
    })
})
//------------------------------------------
//middleware inahabilitar de aca para adelante a menos que este logueado

app.use((req, res, next) => {
    if (id_valido) {
        next()
    } else {
        res.statusCode = 401;
        res.json({
            mensaje: "no autorizado"
        })
    }
})
//DIRECIONAMIENTO DE CERRAR
app.get("/cerrar", (req, res) => {
    id_valido = false;
    res.json({
        mensaje: "sesion cerrada"
    });
})
//------------------------------------------
//DIRECCIONAMIENTO ALUMNOS
app.get("/alumnos", (req, res) => {
    Alumno.find((err, alumnos) => {
        if (err) {
            return console.log(err)
        } else {
            console.log(alumnos)
            res.json(alumnos)
        }
    })

})

//------------------------------------------
//peticion con envio de parametros
//http://localhost:3000/alumnos/3
app.get("/alumnos/:id", (req, res) => {
    let idBuscar = req.params.id
    console.log(idBuscar);
    Alumno.findOne({
            _id: idBuscar
        },
        (err, alumnos) => {
            if (err) {
                return console.log(err)
            } else {
                console.log(alumnos)
                res.json(alumnos)
            }
        })
})

////////////////////////////////////////////////////////////

//Peticiones POST PUT DELETE
//------------------------------------------
app.post("/alumnos", (req, res) => {
    console.log(req.body);
    console.log(req.body.nombre);

    let persona = new Alumno({
        nombre: req.body.nombre,
        edad: req.body.edad,
        profesion: req.body.profesion,
        id_Usuario: req.body.id_Usuario,
    })

    persona.save((err, alumno) => {
        if (err) {
            console.log(err)
        } else {
            res.json(alumno)
        }
    })
})

//------------------------------------------

app.put("/alumnos", (req, res) => {
    console.log(req.body);
    //------------------
    let idModificar = req.body.id;
    let nombreModificar = req.body.nombre;
    let edadModificar = parseInt(req.body.edad);
    let profesionModificar = req.body.profesion;
    //------------------------------------

    Alumno.findByIdAndUpdate(idModificar, {
        nombre: nombreModificar,
        edad: edadModificar,
        profesion: profesionModificar
    }, (err, alumno) => {
        if (err) {
            console.log(err)
        } else {
            console.log(alumno)
            res.json(alumno)
        }
    })

})
//------------------------------------------
app.delete("/alumnos/:idEliminar", (req, res) => {
    console.log(req.params.idEliminar);
    let idEliminar = req.params.idEliminar;
    console.log(idEliminar);
    Alumno.findByIdAndDelete(idEliminar, (err, alumno) => {
        if (err) {
            console.log(err)
        } else {
            res.json(alumno)
        }
    })
})


//MIDDLEWARE DE ERROR 404
app.use((req, res, next) => {
    res.statusCode = 404;
    res.send("la pagina solicitada no existe")
})

//---------------------------------------------------------------
app.listen(port, () => {
    console.log(`Ejemplo de app en http:localhost:${port}`);
    console.log("hola")
})

let DATABASE_URL = `mongodb+srv://entrega:entrega@cluster0.zfkhx.mongodb.net/base_clase?retryWrites=true&w=majority`; 

const mongoose = require("mongoose");
const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();

let userDB = process.env.DB_USER;
let passDB = process.env.DB_PASS;
const port = process.env.PORT || 3000;
let id_valido = false;
 
app.use(cors());  
mongoose.connect(DATABASE_URL);  
let db = mongoose.connection;
db.once("open", () => console.log("session active"))

let Alumno = require("./models/Alumno");
let Usuario = require("./models/Usuario");
app.use(express.json());  
app.use("/", express.static("frontend"))

app.post("/", (req, res) => 
{
    Usuario.findOne({ user: req.body.user, pass: req.body.pass }, (err, unUsuario) => { if (err)  { return console.log(err) } 
             else if (unUsuario === null)  
             {
                 id_valido = false;
                 res.json({id_valido: false})
             } 
             else 
             {
                 id_valido = true;
                 console.log(unUsuario)
                 console.log(unUsuario._id);
                 Alumno.find({id_Usuario: unUsuario._id}, (err, alumnos) => { if (err) { return console.log(err)} 
                        else 
                        {
                         console.log(alumnos)
                         res.json({ datosUsuario: {id_valido: true,id: unUsuario._id,nombreUsuario: unUsuario.user},datosAlumnos: alumnos
                         })
                     }
                 })
             }
      })
})
 
 

app.use((req, res, next) => 
{
    if (id_valido) {
        next()
    } else {
        res.statusCode = 401;
        res.json({
            mensaje: "no autorizado"
        })
    }
})
 
app.get("/cerrar", (req, res) => 
{
    id_valido = false;
    res.json({
        mensaje: "sesion cerrada"
    });
})
 
app.get("/alumnos", (req, res) => 
{
    Alumno.find((err, alumnos) => {
        if (err) {
            return console.log(err)
        } else {
            console.log(alumnos)
            res.json(alumnos)
        }
    })

})

//http://localhost:3000/alumnos/3
app.get("/alumnos/:id", (req, res) => 
{
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

 
app.post("/alumnos", (req, res) => 
{
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

app.put("/alumnos", (req, res) => 
{
    console.log(req.body);
   
    let idModificar = req.body.id;
    let nombreModificar = req.body.nombre;
    let edadModificar = parseInt(req.body.edad);
    let profesionModificar = req.body.profesion;
 
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

app.delete("/alumnos/:idEliminar", (req, res) => 
{
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

app.use((req, res, next) => 
{
    res.statusCode = 404;
    res.send("la pagina solicitada no existe")
})

app.listen(port, () => 
{
    console.log(`Open in http:localhost:${port}`);
     
})

/* app.get("/", (req, res) => 
{
    res.send("hola entraste a la raiz");
}) */

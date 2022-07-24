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
let Content = require("./models/Content");
let Usuario = require("./models/Usuario");

app.use(express.json());  
app.use("/", express.static("public"))

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
                 Content.find({id_Usuario: unUsuario._id}, (err, content) => { if (err) { return console.log(err)} 
                        else 
                        {
                         console.log(content)
                         res.json({ datosUsuario: {id_valido: true,id: unUsuario._id,titleUsuario: unUsuario.user},content: content
                         })
                     }
                 })
             }
      })
})

app.post("/create", (req, res) => 
{
    Usuario.findOne({ user: req.body.user, pass: req.body.pass }, (err, unUsuario) => 
    { 
        if (err)  
        { 
            return console.log(err) 
        } 
        else if (unUsuario === null)  
        {
            let schema = new Usuario({ user: req.body.user, pass: req.body.pass, })
            schema.save((err, content_) => { if (err) { console.log(err) } else { res.json(content_)}})
            
           res.json({id_valido: false})
        } 
      })
})
 
app.use((req, res, next) => 
{
    if (id_valido) 
    {
        next()
    } 
    else 
    {
        res.statusCode = 401;
        res.json({mensaje: "no autorizado"})
    }
})
 
app.get("/cerrar", (req, res) => 
{
    id_valido = false;
    res.json({mensaje: "sesion cerrada"});
})
 
app.get("/content", (req, res) => 
{
    Content.find((err, content) => { if (err) { return console.log(err) } 
          else 
          {
            console.log(content);
            res.json(content);
          }
      })
})


app.post("/content/query", (req, res) => 
{
    console.log(req.body);
    let category_ = req.body.category == "NONE" ? "" : req.body.category;
    let genero_ = req.body.genero == "NONE" ? "" : req.body.genero;
    console.log("content.query");

    console.log(category_);
    console.log(genero_);
   
    Content.find({ 
                  category: category_,
                 }
                ,(err, content) => { if (err) { return console.log(err) } 
          else { console.log(content); res.json(content); }
        })
})

app.get("/test/:title", (req, res) => 
{ 
    Content.find({ title: req.params.title},(err, content) => { if (err) { return console.log(err) } 
          else { console.log(content); res.json(content); }
        })
})

app.get("/content/:title", (req, res) => 
{
    console.log(req.params.title);   
    Content.find({ title: req.params.title},(err, content) => { if (err) { return console.log(err) } 
          else { console.log(content); res.json(content); }
        })
})

app.get("/content/genero/:genero", (req, res) => 
{ 
    Content.find({ genero: req.params.genero},(err, content) => { if (err) { return console.log(err) } 
          else { console.log(content); res.json(content)}
        })
})

app.get("/content/category/:category", (req, res) => 
{   
    Content.find({ category: req.params.category},(err, content) => { if (err) { return console.log(err) } 
          else { console.log(content); res.json(content); }
        })
})

app.get("/content/:id", (req, res) => 
{
    let idBuscar = req.params.id
    console.log(idBuscar);
    Content.findOne({ _id: idBuscar },(err, content) => { if (err) { return console.log(err) } 
          else 
           {
                console.log(content)
                res.json(content)
            }
        })
})

 
app.post("/content", (req, res) => 
{
    let content = new Content({ 
        title: req.body.title, 
        year: req.body.year, 
        genero: req.body.genero,
        status: req.body.status,
        category: req.body.category,
        description: req.body.description,
        id_Usuario: req.body.id_Usuario})
        content.save((err, content_) => { if (err) { console.log(err) } else { res.json(content_)}
    })
})

app.put("/content", (req, res) => 
{
    console.log(req.body);
    Content.findByIdAndUpdate(req.body.id, { 
        title:  req.body.title, 
        year: parseInt(req.body.year), 
        genero: req.body.genero,
        status: req.body.status,
        category: req.body.category,
        description: req.body.description
    }, 
        (err, content) => { if (err) { console.log(err) } 
    else 
        {
            console.log(content)
            res.json(content)
        }
    })

})

app.delete("/content/:idEliminar", (req, res) => 
{
    console.log(req.params.idEliminar);
    let idEliminar = req.params.idEliminar;
    console.log(idEliminar);
    Content.findByIdAndDelete(idEliminar, (err, content) => { if (err)  { console.log(err) } 
        else 
        {
            res.json(content)
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

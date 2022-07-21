const mongoose = require("mongoose");
//MODELOS

let tableName = "alumno";

let schema = mongoose.Schema;
let Schema_ = new schema({
    nombre: String,
    edad: Number,
    profesion: String,
    id_Usuario: String,
})
let alumno = mongoose.model(tableName, Schema_);

module.exports=alumno;
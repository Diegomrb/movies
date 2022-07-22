const mongoose = require("mongoose");
let schema = mongoose.Schema;
let schema_ = new schema({
    nombre: String,
    edad: Number,
    profesion: String,
    id_Usuario: String,
})
let alumnos = mongoose.model("alumnos", schema_);
module.exports = alumnos;

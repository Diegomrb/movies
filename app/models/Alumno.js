const mongoose = require("mongoose");
let tableName = "alumnos";
let schema = mongoose.Schema;
let schema_ = new schema({
    nombre: String,
    edad: Number,
    profesion: String,
    id_Usuario: String,
})
let alumnos = mongoose.model(tableName, schema_);
module.exports = alumnos;

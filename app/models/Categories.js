const mongoose = require("mongoose");
//MODELOS

let tableName = "category";

let schema = mongoose.Schema;
let Schema_ = new schema({
    name: String,
    type: String,
    rank: Number,
    year: Number,
    gender: String,
    description: String,
    status: Number,
    id_Usuario: String,
})
let categoria = mongoose.model(tableName, Schema_);

module.exports= categoria;
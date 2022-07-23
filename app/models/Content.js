const mongoose = require("mongoose");
let schema = mongoose.Schema;
let schema_ = new schema({
    title: String,
    year: Number,
    genero: String,
    id_Usuario: String,
})
let content = mongoose.model("content", schema_);
module.exports = content;

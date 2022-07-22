const mongoose = require("mongoose");
let schema = mongoose.Schema;
let schema_ = new schema({
    user: String,
    pass: String
})
let usuario = mongoose.model("usuarios", schema_)
module.exports = usuario;

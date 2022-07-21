const mongoose = require("mongoose");
//MODELOS

let tableName = "usuario";

let schema = mongoose.Schema;
let Schema_ = new schema({
    user: String,
    pass: String
})
let usuario = mongoose.model(tableName, Schema_)

module.exports=usuario;
const mongoose = require("mongoose");
let tableName = "usuario";
let schema = mongoose.Schema;
let schema_ = new schema({
    user: String,
    pass: String
})
let usuario = mongoose.model(tableName, schema_)
module.exports=usuario;

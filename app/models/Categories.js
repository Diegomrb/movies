const mongoose = require("mongoose");
let tableName = "category";
let schema = mongoose.Schema;
let schema_ = new schema({ 
    name: String,
    type: String,
    rank: Number,
    year: Number,
    gender: String,
    description: String,
    status: Number
})
let categoria = mongoose.model(tableName, schema_);
module.exports= categoria;

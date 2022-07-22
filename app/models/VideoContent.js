const mongoose = require("mongoose");
let schema = mongoose.Schema;
let schema_ = new schema({
    name: String,
    type: String,
    rank: Number,
    year: Number,
    gender: String,
    description: String,
    status: Number,
    id_Usuario: String,
})
let videoContent = mongoose.model("video_content", schema_)
module.exports = videoContent;

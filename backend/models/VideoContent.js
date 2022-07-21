const mongoose = require("mongoose");
//MODELOS
let schema = mongoose.Schema;
let videoContentSchema = new schema({
    name: String,
    type: String,
    rank: Number,
    year: Number,
    gender: String,
    description: String,
    status: Number,
    id_Usuario: String,
})
let videoContent = mongoose.model("video_content", videoContentSchema)

module.exports= videoContent;
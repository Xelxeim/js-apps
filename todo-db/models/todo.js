const {Schema, model} = require("mongoose");
const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    important: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: String,
        required: true
    }
})

module.exports = model("Todo", schema);
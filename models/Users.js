const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    name: {
        type: String,
    },
    id: {
        type: String,
    },
    DOB: {
        type: Date,
    },
}
)


module.exports = mongoose.model("users", userSchema);
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 150
    },
    languages: {
        type: [String]
    },
    skills: [String],
    image: String,
    username: {
        type: String,
        maxlength:200
    },
    password: String
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", userSchema)
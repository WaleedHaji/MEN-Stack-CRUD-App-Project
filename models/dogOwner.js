const mongoose = require('mongoose')

const dogOwnerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    breed: {
        type: String,
        default: "Pure Bred",
    },
    age: {
        type: Number,
        min: 2,
        max: 50,
    },
    personality: {
        type: String,
    },
    size: {
        type: String,
    },
    descriptionOwner:{
        type: String,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isDeleted: {
    type: Boolean,
    default: false
    }

},{timestamps: true})

const dogOwner = mongoose.model('dogOwner', dogOwnerSchema)

module.exports = dogOwner
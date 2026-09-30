const mongoose = require('mongoose')

const dogOwnerSchema = new mongoose.Schema({
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
    }

},{timestamps: true})

const dogOwner = mongoose.model('dogOwner', dogOwnerSchema)

module.exports = dogOwner
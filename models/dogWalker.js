const mongoose = require('mongoose')

const dogWalkerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    walkerLicenseNo: {
        type: Number,
        minLength: 2,
        maxLength: 50,
        unique: true,
    },
    description:{
        type: String,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cprNumber:{
        type: String,
        required: true,
        min: 9,
        max: 9,
    },
    idVerification: {
        type: String,
        required: true,
    }

},{timestamps: true})

const dogWalker = mongoose.model('dogWalker', dogWalkerSchema)

module.exports = dogWalker
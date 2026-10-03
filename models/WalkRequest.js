const mongoose = require('mongoose')

const walkRequestSchema = new mongoose.Schema({

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    dogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dogOwner',
        required: true
    }],

    walker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    duration: {
        type: Number,
        required: true,
        min: 15
    },

    status: {
        type: String,
        enum: ['pending', 'accepted', 'completed', 'cancelled'],
        default: 'pending'
    }

}, { timestamps: true })

const WalkRequest = mongoose.model('WalkRequest', walkRequestSchema)

module.exports = WalkRequest
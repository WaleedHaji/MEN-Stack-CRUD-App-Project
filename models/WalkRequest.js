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

    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },

    status: {
        type: String,
        enum: [
            'pending',
            'accepted',
            'completed',
            'cancelled'
        ],
        default: 'pending'
    },

    walker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },

    status: {
    type: String,
    enum: [
        'pending',
        'accepted',
        'inProgress',
        'completed',
        'cancelled'
    ],
    default: 'pending'
}

}, { timestamps: true })

walkRequestSchema.index({ location: '2dsphere' })

const WalkRequest = mongoose.model('WalkRequest', walkRequestSchema)

module.exports = WalkRequest
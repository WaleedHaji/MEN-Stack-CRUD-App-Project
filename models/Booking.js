const mongoose = require('mongoose')
const dogOwner = require('./dogOwner')

const bookingSchema = new mongoose.Schema ({
    time:{
        type: Number
    },
    location:{
        type: String
    },
    dogOwner:{
        type: String
    },
    dogWalker:{
        type: String
    },
    bookingAccepted:{
        type: Boolean
    },
    distance:{
        type: String
    }

}, {timestamps: true})


const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking
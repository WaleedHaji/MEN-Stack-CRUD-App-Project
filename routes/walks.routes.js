const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const dogOwner = require("../models/dogOwner.js");
const dogWalker = require('../models/dogWalker.js');
const WalkRequest = require('../models/WalkRequest.js');
const isSignedIn = require('../middleware/is-signed-in.js')



router.post('/request', isSignedIn, async (req, res) => {

    const request = await WalkRequest.create({
        owner: req.session.user._id,
        dogs: req.body.dogs,
        location: {
            type: 'Point',
            coordinates: [
                req.body.longitude, 
                req.body.latitude
            ]
        }
    })

    res.redirect('/walks/' + request._id)
})





router.post('/:requestId/accept', isSignedIn, async (req, res) => {

    const request = await WalkRequest.findOneAndUpdate(
        {
            _id: req.params.requestId,
            status: 'pending'
        },
        {
            status: 'accepted',
            walker: req.session.user._id
        },
        { new: true }
    )

    if (!request) {
        return res.send('This request has already been accepted.')
    }

    res.redirect('/walks/' + request._id)
})





module.exports = router;
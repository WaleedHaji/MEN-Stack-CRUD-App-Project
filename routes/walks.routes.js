const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const dogOwner = require("../models/dogOwner.js");
const dogWalker = require('../models/dogWalker.js');
const WalkRequest = require('../models/WalkRequest.js');
const isSignedIn = require('../middleware/is-signed-in.js')

// Show walk requests
router.get('/', isSignedIn, async (req, res) => {

    let requests

    if (req.session.user.userRole === 'dog') {

        requests = await WalkRequest.find({
            owner: req.session.user._id
        })
        .populate('dogs')
        .populate('walker')

    } else {

        requests = await WalkRequest.find({
            walker: req.session.user._id
        })
        .populate('dogs')
        .populate('owner')
    }

    res.render('walks/index.ejs', {
        requests,
        user: req.session.user
    })
})

router.get('/request', isSignedIn, async (req, res) => {

    const dogs = await dogOwner.find({
        owner: req.session.user._id,
        isDeleted: false
    })

    const walkers = await dogWalker.find({
        isDeleted: false
    }).populate('owner')

    res.render('walks/request.ejs', {
        dogs,
        walkers,
        user: req.session.user
    })
})


router.post('/request', isSignedIn, async (req, res, next) => {

    const selectedDogs = Array.isArray(req.body.dogs)
        ? req.body.dogs
        : [req.body.dogs]

    const request = await WalkRequest.create({
        owner: req.session.user._id,
        dogs: selectedDogs,
        walker: req.body.walker,
        duration: req.body.duration,
        status: 'pending'
    })

    req.session.toast = {
        message: 'Walk request sent successfully!',
        type: 'success'
    }

    res.redirect('/walks')
})



router.put('/:requestId/accept', isSignedIn, async (req, res) => {

    const request = await WalkRequest.findOneAndUpdate(
        {
            _id: req.params.requestId,
            walker: req.session.user._id,
            status: 'pending'
        },
        {
            status: 'accepted'
        },
        {
            new: true
        }
    )

    if (!request) {
        return res.send('Request not found or cannot be accepted.')
    }

    res.redirect('/walks')
})


router.put('/:requestId/complete', isSignedIn, async (req, res) => {

    const request = await WalkRequest.findOneAndUpdate(
        {
            _id: req.params.requestId,
            walker: req.session.user._id,
            status: 'accepted'
        },
        {
            status: 'completed'
        },
        {
            new: true
        }
    )

    if (!request) {
        return res.send('Request not found or cannot be completed.')
    }

    res.redirect('/walks')
})


router.put('/:requestId/cancel', isSignedIn, async (req, res) => {

    const request = await WalkRequest.findOneAndUpdate(
        {
            _id: req.params.requestId,
            status: {
                $in: ['pending', 'accepted']
            },
            $or: [
                { owner: req.session.user._id },
                { walker: req.session.user._id }
            ]
        },
        {
            status: 'cancelled'
        },
        {
            new: true
        }
    )

    if (!request) {
        return res.send('Request not found or cannot be cancelled.')
    }

    res.redirect('/walks')
})




module.exports = router;
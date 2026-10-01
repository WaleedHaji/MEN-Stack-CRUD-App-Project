const router = require("express").Router();
const User = require("../models/User.js");
const DogOwner = require('../models/dogOwner.js')
const DogWalker = require('../models/dogWalker.js')
const isSignedIn = require('../middleware/is-signed-in.js')



router.get('/', isSignedIn,async (req,res)=>{
    let profile
    if(req.session.user.userRole == 'dog'){
        profile = await DogOwner.findOne({owner: req.session.user._id})
    }
    else{
        profile = await DogWalker.findOne({owner: req.session.user._id})
    }

    res.render('profiles/userProfile.ejs',{profile, user:req.session.user})
})

router.get('/edit', isSignedIn, async (req, res) => {
    let profile
    if(req.session.user.userRole == 'dog'){
        profile = await DogOwner.findOne({owner: req.session.user._id})
    }
    else{
        profile = await DogWalker.findOne({owner: req.session.user._id})
    }

    res.render('profiles/update-profile.ejs', {profile, user:req.session.user})
})


// router.put('/:listingId', async (req,res)=>{
//     const {streetAddress, city, price, size} = req.body
//     //It's like saying const streetAddress = req.body.streetAddress
//     // This is to simplify the objects at the bottom in the .findByIdAndUpdate(req...., {streetAdd: streetAdd})
//     const updatedListing = await listing.findByIdAndUpdate(req.params.listingId, {
//         streetAddress: streetAddress,
//         city: city,
//         price: price,
//         size: size
//     })
//     res.redirect('/listings') 
// })



module.exports = router;
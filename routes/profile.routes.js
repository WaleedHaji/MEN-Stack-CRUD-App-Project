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


router.put('/edit', isSignedIn, async (req, res) => {

    let profile

    if (req.session.user.userRole === 'dog') {

        profile = await DogOwner.findOneAndUpdate(
            { owner: req.session.user._id },
            {
                name: req.body.name,
                breed: req.body.breed,
                age: req.body.age,
                personality: req.body.personality,
                size: req.body.size,
                descriptionOwner: req.body.descriptionOwner
            },
            { new: true }
        )

    } else {

        profile = await DogWalker.findOneAndUpdate(
            { owner: req.session.user._id },
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                description: req.body.description
            },
            { new: true }
        )
    }

    console.log('UPDATED PROFILE:', profile)

    res.redirect('/userprofile')
})


router.delete('/delete', isSignedIn, async (req, res) => {
    const userId = req.session.user._id

    
    await User.findByIdAndUpdate(
        userId,
        { isDeleted: true }
    )

   
    if (req.session.user.userRole === 'dog') {

        await DogOwner.findOneAndUpdate(
            { owner: userId },
            { isDeleted: true }
        )

    } else if (req.session.user.userRole === 'dogWalker') {

        await DogWalker.findOneAndUpdate(
            { owner: userId },
            { isDeleted: true }
        )
    }

    req.session.destroy((err) => {
        if (err) {
            return res.send('Something went wrong')
        }

        res.redirect('/')
    })
})


module.exports = router;
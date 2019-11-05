// Import necessary Node.js files
const db = require('../../models');

//verifies whether person making group is authorized user
// require('dotenv').config();

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

//get all user's groups (if any)
router.get("/api/group/", function (req, res) {
    db.Users.findOne({
        where: {
            id: req.session.users.id
        }
    }).then(function (user) {
        user.getGroups().then(function (dbGroups) {
            res.json(dbGroups)
        });
    })
});

//get route for retrieving a single group 
router.get("/api/group/:id", function (req, res) {
    // console.log("route called");
    //any user with auth session can create group
    if (req.session.user) {
        db.Groups.findOne({
            where: {
                id: req.session.users.id
            },
        }).then(function (specificGroup) {
            // console.log("then function called");
            // sends success status
            res.status(200).send(specificGroup);
        }).catch(function (err) {
            console.log(err);
            res.status(500).send('Attempt to create group unsuccessful')
        })
    } else {
        res.status(401).send('Please log in first.')
    }
});

// Export these routers
module.exports = router;
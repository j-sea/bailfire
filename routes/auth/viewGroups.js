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
            id: req.body.users_id
        }
    }).then(function (user) {
        user.getGroups()
    }).then(function (dbGroups) {
        res.json(dbGroups)
    });
});

//get route for retrieving a single group 
router.get("/api/group/:id", function (req, res) {
    // console.log("route called");
    db.Groups.findOne({
        where: {
            id: req.params.id
        },
        include: [db.Users]
    }).then(function (specificGroup) {
        // console.log("then function called");
        // sends success status
        res.status(200).send(specificGroup);
    }).catch(function (err) {
        throw err
    })
});

// Export these routers
module.exports = router;
// Import necessary Node.js files
const db = require('../../models');

//verifies whether person making group is authorized user
// require('dotenv').config();

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.get("/api/group/:id", function (req, res) {
    // console.log("route called");
    db.Groups.findOne({
        where: {
            id: req.params.id
        }
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
// Import necessary Node.js files
const db = require('../../models');

//verifies whether person making group is authorized user
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.post("/api/createGroup", function (req, res) {
    db.Groups.create(req.body).then(function (dbGroups) {

        // sends success status
        res.status(200).send(dbGroups);
    })

    console.log(req.body);
});

// Export these routers
module.exports = router;
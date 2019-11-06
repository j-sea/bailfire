// Import necessary Node.js files
const db = require('../../models');

//verifies whether person making group is authorized user
// require('dotenv').config();

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.delete("/api/group/:uuid", function (req, res) {
    db.Groups.destroy({
        where: {
            uuid: req.params.uuid
        }
    }).then(function () {
        // sends success status
        res.status(200).send();
    }).catch(function (err) {
        throw err
    })
});

// Export these routers
module.exports = router;
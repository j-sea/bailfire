// Import necessary Node.js files
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.delete("/api/group/:id", function (req, res) {
    //TODO: what to compare req.session.user.id to??? verifies whether person deleting group is authorized user
    if (req.session.user.id === 0) {
        db.Groups.destroy({
            where: {
                id: req.params.id
            }
        }).then(function () {
            // sends success status
            res.status(200).send();
        }).catch(function (err) {
            throw err
        });
    } else {
        res.status(401).send('Unauthorized to delete group')
    }
})

// Export these routers
module.exports = router;
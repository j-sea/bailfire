// Import necessary Node.js files
const db = require('../../models');
const { Op } = require('sequelize');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

// Route for grabbing all user locations related to a group
router.get("/api/user-locating-enabled/:uuid", function (req, res) {
    // If the user is logged in
    if (req.session.user) {
        // If our logged in user is a part of this group
        db.GroupUserDetails.findOne({
            where: {
                group_uuid: req.params.uuid,
                user_uuid: req.session.user.user_uuid,
            }
        })
        .then(function (groupUserDetail) {
            // If we found that the user is a part of this group
            if (groupUserDetail !== null) {
                // Get all of the group user details related to the Group UUID not including the logged-in user
                db.GroupUserDetails.findOne({
                    where: {
                        group_uuid: req.params.uuid,
                        user_uuid: req.session.user.user_uuid,
                    },
                }).then(function (groupUserDetail) {
                    if (groupUserDetail !== null) {
                        // sends success status with whether locating is enabled or not
                        res.status(200).json({locatingEnabled: groupUserDetail.locatingEnabled});
                    }
                    else {
                        res.status(500).send('Attempt to get group user locating info unsuccessful')
                    }
                }).catch(function (err) {
                    console.log(err);
                    res.status(500).send('Attempt to get group user locating info unsuccessful')
                });
            }
            // If the user is not part of the group
            else {
                console.log('User tried to access group they are not a member of');
                res.status(401).send('Please log in first.')
            }
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).send('Server encountered error when pulling group details');
        });
    } else {
        res.status(401).send('Please log in first.');
    }
});

// Export these routers
module.exports = router;
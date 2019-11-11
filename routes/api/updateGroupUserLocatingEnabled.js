// Import necessary Node.js files
const db = require('../../models');
const { Op } = require('sequelize');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

// Route for grabbing all user locations related to a group
router.put("/api/user-locating-enabled/:uuid", function (req, res) {
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
                // Update the locating enabled of the user for this group
                db.GroupUserDetails.update(req.body, {
                    where: {
                        group_uuid: req.params.uuid,
                        user_uuid: req.session.user.user_uuid,
                    }
                })
                .then(function ([updatedUserDetails]) {
                    // If we updated one record
                    if (updatedUserDetails === 1) {
                        res.status(200).end();
                    }
                    // If this user is attached to more than one GroupUserDetail in this group, that's incorrect
                    else {
                        console.log('This user is attached to more than one GroupUserDetail in this group');
                        res.status(500).send('Could not update group user locating info');
                    }
                }).catch(function (err) {
                    console.log(err);
                    res.status(500).send('Could not update group user locating info');
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
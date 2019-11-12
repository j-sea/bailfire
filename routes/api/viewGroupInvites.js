// Import necessary Node.js files
const db = require('../../models');
const { Op } = require('sequelize');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

//get all user's groups (if any)
// Kerry: consider renaming this route ex: /api/user/group or /api/user/:id/group
router.get("/api/group/:uuid/invites/", function (req, res) {

    //any user with auth session can create group
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
                // Get all of the group invites related to this group
                db.GroupInvites.findAll({
                    where: {
                        group_uuid: req.params.uuid,
                    }
                })
                .then(function (groupInvites) {
                    res.status(200).json(groupInvites);
                })
                .catch(function (error) {
                    console.log(error);
                    res.status(500).send('Attempt to view group invites unsuccessful');
                });
            }
            // If the user is not a part of this group, deny the view
            else {
                console.error('User is not a part of this group!');
                res.status(500).send('Attempt to view group invites unsuccessful');
            }
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).send('Attempt to view group invites unsuccessful');
        })
    }
    else {
        res.status(401).send('Please log in first.');
    }
})

module.exports = router;

// Import necessary Node.js files
const db = require('../../models');
const { Op } = require('sequelize');

//verifies whether person making group is authorized user
// require('dotenv').config();

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

//get all user's groups (if any)
router.get("/api/user/group", function (req, res) {
    // db.Groups.findAll({
    //     //identifies user that we want groups of 
    //     where: {
    //         UserId: req.session.user.id
    //     }
    // }).then(function (dbGroups) {
    //     res.json(dbGroups)
    // });

    // Grab all of the group user details related to this user
    db.GroupUserDetails.findAll({
        where: {
            user_uuid: req.session.user.user_uuid,
        }
    })
        .then(function (groupUserDetails) {
            // If the user has associated groups
            if (groupUserDetails.length !== 0) {
                // Grab all of the group UUIDs related to groups this user is a part of
                const groups = groupUserDetails.map(function (groupUserDetail) {
                    return groupUserDetail.group_uuid;
                });

                // Grab all of the groups we want 
                db.Groups.findAll({
                    where: {
                        group_uuid: {
                            [Op.or]: groups,
                        }
                    }
                })
                    .then(function (groups) {
                        res.status(200).json(groups);
                    })
                    .catch(function (error) {
                        console.log(error);
                        res.status(500).send('Server encountered error when retrieving groups');
                    })
            }
            // No groups, return an empty array to the requester
            else {
                res.status(200).send([]);
            }
        })
})


//get route for retrieving a single group 
router.get("/api/group/:uuid", function (req, res) {
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
                    // Find the group related to the provided Group UUID
                    db.Groups.findOne({
                        where: {
                            group_uuid: req.params.uuid
                        },
                        raw: true
                        //all other users in the one specified group
                    }).then(function (specificGroup) {
                        return db.GroupUserDetails.findAll({
                            where: {
                                group_uuid: req.params.uuid
                            },
                            raw: true
                            //once user details found, sending it back as part of response
                        }).then(function (addedPeople) {
                            return { ...specificGroup, addedPeople }
                        })
                    })
                        .then(function (specificGroup) {
                            // console.log('specific group', specificGroup)
                            // console.log("then function called");
                            // sends success status
                            res.status(200).send(specificGroup);
                        }).catch(function (err) {
                            console.log(err);
                            res.status(500).send('Attempt to view group unsuccessful')
                        });
                }
                // If the user is not a part of this group, deny the view
                else {
                    res.status(500).send('Attempt to view group unsuccessful')
                }
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).send('Attempt to view group unsuccessful')
            })
    } else {
        res.status(401).send('Please log in first.')
    }
});

// Export these routers
module.exports = router;
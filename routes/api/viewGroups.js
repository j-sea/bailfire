// Import necessary Node.js files
const db = require('../../models');
const { Op } = require('sequelize');

//verifies whether person making group is authorized user
// require('dotenv').config();

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

//get all user's groups (if any)
// Kerry: consider renaming this route ex: /api/user/group or /api/user/:id/group
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
				res.json(groups);
			})
		})
})


//get route for retrieving a single group 
router.get("/api/group/:uuid", function (req, res) {
    // console.log("route called");
    //any user with auth session can create group
    if (req.session.user) {
        db.Groups.findOne({
            where: {
                group_uuid: req.params.uuid
            },
        }).then(function (specificGroup) {
            console.log('specific group', specificGroup)
            // console.log("then function called");
            // sends success status
            res.status(200).send(specificGroup);
        }).catch(function (err) {
            console.log(err);
            res.status(500).send('Attempt to view group unsuccessful')
        })
    } else {
        res.status(401).send('Please log in first.')
    }
});

// Export these routers
module.exports = router;
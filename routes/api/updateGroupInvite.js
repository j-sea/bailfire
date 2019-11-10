// Import necessary Node.js files
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.put("/api/group-invite", function (req, res) {
	// Let's update the invite which will update the related group's page
	if (Object.prototype.hasOwnProperty.call(req.body, 'invite_uuid')) {
		// Find the group invite
		db.GroupInvites.update(req.body, {
			where: {
				invite_uuid: req.body.invite_uuid,
			}
		})
		// On success, use destructuring to grab the relevant data
		.then(function([invitesUpdated]){
			// If there was only one update
			if (invitesUpdated === 1) {
				// If the user accepted the invite
				if (req.body.accepted) {
					// Get the affected invite (MySQL in Sequelize requires you to retrieve the record you just updated if you want its record)
					db.GroupInvites.findOne({
						where: {
							invite_uuid: req.body.invite_uuid,
						}
					})
					.then(function (groupInvite) {
						// Find the details about this invite's group
						db.Groups.findOne({
							where: {
								group_uuid: groupInvite.group_uuid,
							}
						})
						// On success
						.then(function (groupResult) {
							// Find all group user details related to this invite's group
							db.GroupUserDetails.findAll({
								where: {
									group_uuid: groupResult.group_uuid,
								}
							})
							.then(function (groupUserDetails) {
								// Collect all of the group's colors in use right now
								const groupColors = groupUserDetails.map(function (groupUserDetail) {
									return groupUserDetail.color;
								});
		
								// Grab a new random color
								let randomColor = "#000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
								// Keep grabbing a new random color as long as we randomized one that already exists
								while (groupColors.indexOf(randomColor) !== -1) {
									randomColor = "#000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
								}
								
								// Create the user's details and link them to the group
								db.GroupUserDetails.create({
									group_uuid: groupInvite.group_uuid,
									user_uuid: req.body.guest_user_uuid,
									color: randomColor,
									name: 'New Member',
									description: 'I\'m a new member to the group!',
									UserId: req.body.user_id,
									GroupId: groupResult.id,
								})
								.then(function () {
									// Send our group invite details back to the requester
									res.status(200).json(groupInvite);
								})
								.catch(function (error) {
									console.log(error);
									res.status(500).send('Server encountered error when creating group invite.');
								})
							})
							.catch(function (error) {
								console.log(error);
								res.status(500).send('Server encountered error when creating group invite.');
							});
						})
						.catch(function (error) {
							console.log(error);
							res.status(500).send('Server encountered error when creating group invite.');
						})
					})
					.catch(function (error) {
						console.log(error);
						res.status(500).send('Server encountered error when retrieving group invite information.');
					});
				}
				// If the user rejected the invite
				else {
					// Send the updated group invite UUID back to the requester
					res.status(200).json({
						invite_uuid: req.body.invite_uuid
					});
				}
			}
			else {
				// There should be one result with that invite_uuid
				res.status(500).send('Attempt to update group invite unsuccessful');
			}
		})
		.catch(function (error) {
			console.log(error);
			res.status(500).send('Attempt to update group invite unsuccessful');
		});
	}
	else {
		res.status(500).send('Attempt to update group invite unsuccessful')
	}
});

// Export these routers
module.exports = router;


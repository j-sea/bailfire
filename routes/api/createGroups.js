// Import necessary Node.js files
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

const emailer = require('../../utils/email');
const texter = require('../../utils/sms');

router.post("/api/group", function (req, res) {
	//any user with auth session can create group
	if (req.session.user) {
		//splice creates copy of Group
		let newGroup = {
			group_name: req.body.group_name,
			description: req.body.description,
			UserId: req.session.user.id, // Add new column to table for the admin user assocation
		};

		// Create the group
		db.Groups.create(newGroup)
		// If successful
		.then(function (dbGroup) {
			// Grab a random color for the user
			const randomColor = "#000".replace(/0/g, () => (~~(Math.random()*16)).toString(16));
			
			// Set up and link user details for the admin
			db.GroupUserDetails.create({
				group_uuid: dbGroup.group_uuid,
				user_uuid: req.session.user.user_uuid,
				color: randomColor,
				name: 'Admin',
				description: 'Admin of group',
			})
			.then(function () {
				// Send any and all invites to the various emails and phone numbers
				req.body.addedPeople.forEach(person => {
					if (person.type === 'email' || person.type === 'phone') {

						// Let's generate a group invite they can send someone who will then have a guest user created for them when they accept the invite
						if (Object.prototype.hasOwnProperty.call(dbGroup.dataValues, 'group_uuid')) {
							// Create a new group invite
							const inviteData = {
								group_uuid: dbGroup.group_uuid,
							};
							if (person.type === 'email') {
								inviteData['email'] = person.value;
							}
							else if (person.type === 'phone') {
								inviteData['phone'] = person.value;
							}
							db.GroupInvites.create(inviteData)
							.then(function (groupInvite) {
								if (person.type === 'email') {
									// Send an e-mail invite
									emailer(person.value, groupInvite.invite_uuid);
								}
								else if (person.type === 'phone') {
									// Send an SMS invite
									texter(person.value, groupInvite.invite_uuid);
								}
							})
							.catch(function (error) {
								console.error(error);
								// res.status(500).send('Failed to create group invite');
							});
						}
						else {
							console.error('no group uuid');
							// res.status(500).send('Attempt to create group invite unsuccessful')
						}
					}
					else {
						console.error('This person type is unknown: ' + person.type);
					}
				});

				// sends success status for the group creation
				res.status(200).send(dbGroup);
			})
			.catch(function (error) {
				console.log(error);
				res.status(500).send('Server encountered error when creating group user details.');
			});
		})
		//if not sucessful, will catch error to inform user
		.catch(function (err) {
			console.log(err);
			res.status(500).send('Attempt to create group unsuccessful')

		});
	} else {
		res.status(401).send('Please log in first.')
	}

});

// Export these routers
module.exports = router;


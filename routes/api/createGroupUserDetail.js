// Import necessary Node.js files
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.post("/api/user/group-detail", function (req, res) {
	//any user with auth session can create group
	if (req.session.user) {
		db.GroupUserDetails.findAll({
			where: {
				group_uuid: req.body.group_uuid,
			}
		})
		.then(function (groupUserDetails) {
			const groupColors = groupUserDetails.map(function (groupUserDetail) {
				return groupUserDetail.color;
			});
			let randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
			while (groupColors.indexOf(randomColor) !== -1) {
				randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
			}

			db.GroupsUserDetails.create({
				group_uuid: req.body.group_uuid,
				user_uuid: req.session.user.user_uuid,
				invite_uuid: req.body.invite_uuid,
				color: randomColor,
				name: req.body.name,
				description: req.body.description,
			})
			.then(function (groupUserDetail) {
				res.status(200).json(groupUserDetail);
			})
			.catch(function (error) {
				console.log(error);
				res.status(500).send('Server encountered error when creating group user details.');
			})
		})
		.catch(function (error) {
			console.log(error);
			res.status(500).send('Server encountered error when creating group user details.');
		});
	}
	else {
		res.status(401).send('Please log in first.');
	}

});

// Export these routers
module.exports = router;


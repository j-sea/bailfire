// Import necessary Node.js files
const db = require('../../models');

//verifies whether person making group is authorized user
// require('dotenv').config();

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.put("/api/group/:uuid", function (req, res) {
    db.Groups.findOne({
        where: {
            group_uuid: req.params.uuid
        }
    }).then(function (group) {
        //if session user matches user that created group
        if (req.session.user.id === group.UserId) {
            //update group by uuid
            db.Groups.update(req.body, {
                where: {
                    group_uuid: group.group_uuid
                }
            }).then(function () {
                // sends success status
                res.status(200).send();
                //will throw error if group can't be updated
            }).catch(function (err) {
                console.log(err);
                res.status(500).send('Attempt to update group unsuccessful')
            })
        } else {
            //if session user doesn't match user that created group
            res.status(401).send('Please log in first.')
        }
    }).catch(function (err) {
        console.log(err);
        res.status(500).send('Could not find group to update')
    })
})

// Export these routers
module.exports = router;

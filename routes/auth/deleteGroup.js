// Import necessary Node.js files
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.delete("/api/group/:uuid", function (req, res) {
    //find group that..
    db.Groups.findOne({
        //..matches group uuid that user wants to delete
        where: {
            group_uuid: req.params.uuid
        }
    }).then(function (group) {
        //verify if session user matches person that created group
        if (req.session.user.id === group.UserId) {
            //if yes, delete group by matching group uuid
            db.Groups.destroy(req.body, {
                where: {
                    group_uuid: group.group_uuid
                }
            }).then(function () {
                //and sends success status
                res.status(200).send();
                //if delete unsuccessful, advise user
            }).catch(function (err) {
                console.log(err);
                res.status(500).send('Attempt to delete group unsuccessful')
            });
        } else {
            //if user unauthorized to delete group, advise user
            res.status(401).send('Unauthorized to delete group')
        }
    }).catch(function (err) {
        //if group uuid is invalid, advise user
        console.log(err);
        res.status(500).send('Could not find group to delete')
    })
})
// Export these routers
module.exports = router;
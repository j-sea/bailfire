// Import necessary Node.js files
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

const emailer = require('../../utils/email');
const texter = require('../../utils/sms');

router.put("/api/group/:uuid", function (req, res) {
    db.Groups.findOne({
        where: {
            group_uuid: req.params.uuid
        }
    }).then(function (group) {
        //if session user matches user that created group
        if (req.session.user.id === group.UserId) {
            const updateBody = {
                ...req.body
            };
            delete updateBody.addedPeople;
            delete updateBody.removedPeople;

            //update group by uuid
            db.Groups.update(updateBody, {
                where: {
                    group_uuid: group.group_uuid
                }
            }).then(function () {
                console.log(req.body);
                // Send any and all invites to the various emails and phone numbers
                req.body.addedPeople.forEach(person => {
                    if (person.type === 'email' || person.type === 'phone') {
                        // Let's generate a group invite they can send someone who will then have a guest user created for them when they accept the invite
                        if (Object.prototype.hasOwnProperty.call(group.dataValues, 'group_uuid')) {
                            // Create a new group invite
                            const inviteData = {
                                group_uuid: group.group_uuid,
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

                // Remove all group invites related to the removed people
                req.body.removedPeople.forEach(person => {
                    if (person.type === 'email' || person.type === 'phone') {
                        // If the removed person provides its invite UUID
                        if (Object.prototype.hasOwnProperty.call(person, 'inviteUUID')) {
                            // Remove the group invite
                            db.GroupInvites.destroy({
                                where: {
                                    invite_uuid: person.inviteUUID
                                }
                            })
                            .then(function (result) {
                                console.log(result);
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

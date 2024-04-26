var express = require('express');
var router = express.Router();
const {usersCollection} = require('../../../db')
router.post('/users', async (req, res) => {
    const user = req.body;
    const query = { email: user.email }
    const axistingUser = await usersCollection.findOne(query);
    if (axistingUser) {
        return res.send({ message: ' use already exists' })
    }
    const result = await usersCollection.insertOne(user);
    res.send(result)
})

module.exports = router
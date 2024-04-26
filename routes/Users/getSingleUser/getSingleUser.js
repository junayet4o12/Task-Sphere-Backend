var express = require('express');
const { usersCollection } = require('../../../db');
var router = express.Router();

router.get('/users/:email', async (req, res) => {
    const email = req?.params?.email
    const query = { email: email }
    const result = await usersCollection.findOne(query);
    res.send(result)
})
module.exports = router
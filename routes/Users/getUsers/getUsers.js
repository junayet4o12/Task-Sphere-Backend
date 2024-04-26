var express = require('express');
const { usersCollection } = require('../../../db');
var router = express.Router();

router.get('/users', async (req, res) => {
    const result = await usersCollection.find().toArray();
    res.send(result)
})
module.exports = router
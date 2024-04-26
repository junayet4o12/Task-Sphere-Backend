var express = require('express');
const clientsCollection = require('../../../db');
var router = express.Router();

router.get('/clients', async (req, res) => {
    const result = await clientsCollection.find().toArray()
    res.send(result)
}) 

module.exports = router
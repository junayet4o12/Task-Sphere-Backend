const { ObjectId } = require('mongodb');
var express = require('express');
const { taskCollection } = require('../../../db');
var router = express.Router();
router.get('/singletask/:id', async (req, res) => {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) }
    const result = await taskCollection.findOne(query)
    res.send(result)
})

module.exports = router
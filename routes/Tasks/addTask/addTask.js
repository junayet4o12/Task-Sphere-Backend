var express = require('express');
const { taskCollection } = require('../../../db');
var router = express.Router();

router.post('/tasks', async (req, res) => {
    const task = req?.body;
    const result = await taskCollection.insertOne(task)
    res.send(result)
})
module.exports = router
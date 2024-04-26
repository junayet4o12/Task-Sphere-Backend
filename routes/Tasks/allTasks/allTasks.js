var express = require('express');
const { taskCollection } = require('../../../db');
var router = express.Router();

router.get('/tasks', async (req, res) => {
    const result = await taskCollection.find().toArray()
    res.send(result)
})
module.exports = router
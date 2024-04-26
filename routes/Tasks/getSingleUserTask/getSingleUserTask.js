var express = require('express');
const { taskCollection } = require('../../../db');
var router = express.Router();

router.get('/tasks/:email', async (req, res) => {
    const email = req?.params?.email;
    const query = { creator: email }
    const result = await taskCollection.find(query).toArray()
    res.send(result)
})
module.exports = router
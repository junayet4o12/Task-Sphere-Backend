const { ObjectId } = require('mongodb');
var express = require('express');
const { taskCollection } = require('../../../db');
var router = express.Router();
router.put('/tasksCompleted/:id', async (req, res) => {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) }
    const updatedData = {
        $set: {
            type: 'completed'
        }
    }
    const result = await taskCollection.updateOne(query, updatedData)
    res.send(result)
})

module.exports = router
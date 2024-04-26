const { ObjectId } = require('mongodb');
var express = require('express');
const { taskCollection } = require('../../../db');
var router = express.Router();
router.put('/singletaskupdate/:id', async (req, res) => {
    const data = req?.body
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) }
    const updateTask = {
        $set: {
            title: data?.title,
            deadline: data?.deadline,
            description: data?.description,
            priority: data?.priority

        }
    }
    const result = await taskCollection.updateOne(query, updateTask)
    res.send(result)
})

module.exports = router
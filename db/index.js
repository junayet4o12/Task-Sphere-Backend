const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const uri = `${process.env.DB_URI}`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const taskSphere = client.db('taskSphere')
const usersCollection = taskSphere.collection('users')
const taskCollection = taskSphere.collection('task')
const clientsCollection = taskSphere.collection('clients')

module.exports = { taskSphere, usersCollection, taskCollection, clientsCollection };
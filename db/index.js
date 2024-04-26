const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fbi4wg4.mongodb.net/?retryWrites=true&w=majority`;
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

module.exports = {taskSphere, usersCollection, taskCollection, clientsCollection};
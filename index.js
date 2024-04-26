const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fbi4wg4.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const allClients = require('./routes/Clients/AllClients/AllClients')
const addUsers = require('./routes/Users/addUsers/addUsers')
const getSingleUsers = require('./routes/Users/getSingleUser/getSingleUser')
const getUsers = require('./routes/Users/getUsers/getUsers')
const getSingleUserTask = require('./routes/Tasks/getSingleUserTask/getSingleUserTask')
const addTasks = require('./routes/Tasks/addTask/addTask')
const allTasks = require('./routes/Tasks/allTasks/allTasks')
const makeTaskToDo = require('./routes/Tasks/makeTaskToDo/makeTaskToDo')
const makeTaskOngoing = require('./routes/Tasks/makeTaskOngoing/makeTaskOngoing')
const makeTaskCompleted = require('./routes/Tasks/makeTaskCompleted/makeTaskCompleted')
const singleTaskUpdate = require('./routes/Tasks/singleTaskUpdate/singleTaskUpdate')
async function run() {
    try {
        const taskSphere = client.db('taskSphere')
        const taskCollection = taskSphere.collection('task')
        // usersCollection start
        app.use(addUsers)
        app.use(getSingleUsers)
        app.use(getUsers)
        // usersCollection end 

        // taskCollection start
        app.use(allTasks)
        app.use(addTasks)
        app.use(getSingleUserTask)
        app.use(makeTaskToDo)
        app.use(makeTaskOngoing)
        app.use(makeTaskCompleted)
        app.use(singleTaskUpdate)
        
        
        
        app.delete('/tasks/:id', async (req, res) => {
            const id = req?.params?.id;
            const query = { _id: new ObjectId(id) }
            const result = await taskCollection.deleteOne(query)
            res.send(result)
        })
        app.get('/singletask/:id', async (req, res) => {
            const id = req?.params?.id;
            const query = { _id: new ObjectId(id) }
            const result = await taskCollection.findOne(query)
            res.send(result)
        })
        // taskCollection end
        // clientsCollection start
        app.use(allClients)
        // clientsCollection end

    }
    finally {

    }
}
run().catch(console.dir);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



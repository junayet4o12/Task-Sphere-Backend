const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.json())

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
const deleteTask = require('./routes/Tasks/deleteTask/deleteTask')
const singleTask = require('./routes/Tasks/getSingleTask/getSingleTask')
async function run() {
    try {
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
        app.use(deleteTask)
        app.use(singleTask)
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

app.get('/', (req, res) => {
    res.send('Hello World!')
})



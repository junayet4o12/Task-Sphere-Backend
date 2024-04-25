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

async function run() {
    try {
        const taskSphere = client.db('taskSphere')
        const usersCollection = taskSphere.collection('users')
        const taskCollection = taskSphere.collection('task')
        const clientsCollection = taskSphere.collection('clients')

        // usersCollection start
        app.post('/users', async (req, res) => {
            const user = req.body;
            const query = { email: user.email }
            const axistingUser = await usersCollection.findOne(query);
            if (axistingUser) {
                return res.send({ message: ' use already exists' })
            }
            const result = await usersCollection.insertOne(user);
            res.send(result)
        })


        app.get('/users', async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result)
        })
        app.get('/users/:email', async (req, res) => {
            const email = req?.params?.email
            const query = { email: email }
            const result = await usersCollection.findOne(query);
            res.send(result)
        })
        // usersCollection end 

        // taskCollection start
        app.get('/tasks', async (req, res) => {
            const result = await taskCollection.find().toArray()
            res.send(result)
        })
        app.post('/tasks', async (req, res) => {
            const task = req?.body;
            const result = await taskCollection.insertOne(task)
            res.send(result)
        })
        app.get('/tasks/:email', async (req, res) => {
            const email = req?.params?.email;
            const query = { creator: email }
            const result = await taskCollection.find(query).toArray()
            res.send(result)
        })
        app.put('/tasksOngoing/:id', async (req, res) => {
            const id = req?.params?.id;
            const query = { _id: new ObjectId(id) }
            const updatedData = {
                $set: {
                    type: 'ongoing'
                }
            }
            console.log(query);
            const result = await taskCollection.updateOne(query, updatedData)
            res.send(result)
        })
        app.put('/tasksCompleted/:id', async (req, res) => {
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
        app.put('/singletaskupdate/:id', async (req, res) => {
            const data = req?.body
            const id = req?.params?.id;
            const query = { _id: new ObjectId(id) }
            const updatedtask = {
                $set: {
                    title: data?.title,
                    deadline: data?.deadline,
                    description: data?.description,
                    priority: data?.priority

                }
            }
            const result = await taskCollection.updateOne(query, updatedtask)
            res.send(result)
        })
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
        app.get('/clients', async(req, res)=> {
          const result = await clientsCollection.find().toArray()
          res.send(result)
        }) 
        // clientsCollection end

    }
    finally {

    }
}
run().catch(console.dir);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
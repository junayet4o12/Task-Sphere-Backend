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
        app.get('/users/:email',  async (req, res) => {
            const email = req?.params?.email
            const query = { email: email }
            const result = await usersCollection.findOne(query);
            res.send(result)
        })
        
       
    }
    finally {

    }
}
run().catch(console.dir);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
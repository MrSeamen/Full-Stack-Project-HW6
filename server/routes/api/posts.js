//imports
let express = require('express');
let mongodb = require('mongodb');

let router = express.Router();

//database
let database = `demo`;
let connectionString = 'mongodb://localhost:27017/' + database;

//get posts
router.get('/', async (req, res) => {
    let posts = await loadCollection('posts');
    res.send(await posts.find({}).toArray());
})

//add posts
router.post('/', async (req, res) => {
    let posts = await loadCollection('posts');
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})

//delete post
router.delete('/:_id', async (req, res) => {
    let posts = await loadCollection('posts');
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params._id) })
    res.status(200).send();
})

//database
async function loadCollection(collection){
    let client = await mongodb.MongoClient.connect(connectionString, {
        useNewUrlParser: true
    });
    return client.db(database).collection(collection);
}
//generics
//CRUD examples (for reference only)
//read
router.post('/getDocument', async (req, res) => {
    //get params
    let collection = await loadCollection(req.body.collection);
    let query = { _id: req.body.item._id };
    //build document
    let document = await collection.findOne(query);
    //return
    res.send(document);
});

//create/update
router.post('/setDocument', async (req, res) => {
    //get params
    let collection = await loadCollection(req.body.collection);
    let query = { _id: req.body.item._id };
    let options = { //insert if doesn't exist
        upsert: true,
    };
    //build document
    let replace = req.body.item;
    await collection.replaceOne(query, replace, options);
    //return
    res.status(201).send();
});

//delete
router.post('/deleteDocument', async (req, res) => {
    //get params
    let collection = await loadCollection(req.body.collection);
    let query = { _id: req.body.item._id };
    //execute query
    await collection.deleteOne(query);
    //return
    res.status(201).send();
});

//customs
//delete user
router.post('/deleteUser', async (req, res) => {
    //get params
    let collection = await loadCollection(req.body.collection);
    let query = { _id: req.body.item._id };
    //execute query
    await collection.delete(query);
    //return
    res.status(201).send();
});

//set user
router.post('/setUser', async (req, res) => {
    //get params
    let collection = await loadCollection(req.body.collection);
    let query = { _id: req.body.item._id };
    //execute query
    //return
    res.status(201).send();
});

//get access token
router.post('/getToken', async (req, res) => {
    //get params
    let collection = await loadCollection(req.body.collection);
    let query = { _id: req.body.item._id };
    //execute query
    //return
    res.send(result);
});
*

//export
module.exports = router;
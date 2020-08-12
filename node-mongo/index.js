const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/'; //PORT NUMBER
const dbname = 'nucampsite'; //DATA BASE NAME

//ERR, CLIENT IS A CALLBACK FUNCTION 
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null); // IF ERR IS NOT EQUAL TO NULL IT WILL FAIL AND CLOSE THE WHOLE APPLICATION. IF ERR === NULL THEN PUT 

    console.log('Connected correctly to server');

    const db = client.db(dbname);  //THIS CONNECTS US TO THE NUCAMPSITE DATA IN THE SERVER

    db.dropCollection('campsites', (err, result) => { //DROP == DELETE 
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);

        const collection = db.collection('campsites');

        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
        (err, result) => {
            assert.strictEqual(err, null);
            console.log('Insert Document:', result.ops);

            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);

                client.close();
            });
        });
    });
});

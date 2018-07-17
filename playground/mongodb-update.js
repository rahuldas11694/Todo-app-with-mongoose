// const MongoClient = require('mongodb').MongoClient;
// the above line can be written as follows - ES-6 object destucturing
// ObjectId("5b4d8290f982d0547bf24131")
const {MongoClient, ObjectId} = require('mongodb');


// start mongo $> ./mongod --dbpath ~/mongo-data/
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
	if(err)
		return console.log("Unable to co to Db",err);
		console.log("DB Connected");

		db.collection('Todos').findOneAndUpdate({_id: new ObjectId("5b4d8290f982d0547bf24131")}, {
			$set : { // this is the operator
				completed : 'completedRe'
			}
		},
		{
			returnOriginal : false
		}).then((res)=>{
			console.log("UPDATED - ", res);
		})

		db.collection('Users').findOneAndUpdate({_id: new ObjectId("5b4d8d18e2123c574b4fc301")}, {
			$set : { // this is the operator
				name : 'MINI-TINI'
			},
			$inc : {
				age : 50
			}

		},
		{
			returnOriginal : false
		}).then((res)=>{
			console.log("UPDATED - ", res);
		})

	db.close();

})
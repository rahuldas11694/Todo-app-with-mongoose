// const MongoClient = require('mongodb').MongoClient;
// the above line can be written as follows - ES-6 object destucturing
const {MongoClient, ObjectId} = require('mongodb');


// start mongo $> ./mongod --dbpath ~/mongo-data/
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
	if(err)
		return console.log("Unable to co to Db",err);
		console.log("DB Connected");

		db.collection('Todos').deleteMany({text: 'watch course'}).then((res)=>{
			console.log("DELED ... ", res)
		})

	db.close();

})
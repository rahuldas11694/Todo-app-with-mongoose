const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../model/todo');
const {User} = require('./../../model/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
	_id : userOneId,
	email : 'abcd@xtz.com',
	password : '1234567',
	tokens : [{
		access : 'auth',
		token : jwt.sign({_id : userOneId, access:'auth'},'qwerty').toString()
	},{
		_id : userOneId,
		email : 'abcd@xtyz.com',
		password : '12345a67'
	}
	]

}]


const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];


const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
	console.log("hete")
	User.remove({}).then(() => {
		console.log("populaterUsers----");
		var userOne = new User(users[0]).save();
		var userTwo = new User(users[1]).save();

		return Promise.all([userOne,userTwo])
  }).then(() => done());

}

module.exports = {todos, populateTodos, users, populateUsers};


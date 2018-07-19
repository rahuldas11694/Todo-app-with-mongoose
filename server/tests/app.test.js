var expect= require("expect");
var request = require("supertest");

var {app} = require("./../app");
var {Todo} = require("./../model/todo");
const {todos,populateTodos,users,populateUsers} = require('./seeds/seed');
// console.log("-------",populateUsers,'--\n--',users,'---\n---',todos,'--\n---',populateTodos)



beforeEach(populateUsers);
// beforeEach(populateTodos);

/*describe("POST /todos,",()=> {
	it("# should create a new todo", (done)=> {
		var text = "qwe";

		request(app)
		.post('/todos')
		.send({
			text
		})
		.expect(200)
		.expect((res)=> {
			expect(res.body.text).toBe(text);
		})
		.end((err,res)=>{
			if(err){
				return done(err);
			}

			Todo.find().then((todos)=>{
				expect(todos.length).toBe(1);
				expect(todos[0].text).toBe(text);
				done();
			})
			.catch((err) => done(err));
		})

	});

	it("#should not create an todo for invalid data",(done)=>{

		var text = "";

		request(app)
		.post('/todos')
		.send({
			
		})
		.expect(400)
		.end((err,res)=>{
			if(err)
				return done(err);

			Todo.find()
			.then((todos)=> {
				expect(todos.length).toBe(0);
				done();
			})
			.catch((err)=> {
				done(err);
			})

		})
	})

});*/
console.log("asdasd",users[0])
describe('# GET /user/me', ()=>{
	it('should return user if authenticated',(done)=>{
		request(app)
		.get('/user/me')
		.set('x-auth',users[0].tokens[0].token)
		.expect(200)
		.expect((res)=>{
			expect(res.body._id).toBe(users[0]._id);
			expect(res.body.email).toBe(users[0].email);
			done()
		})
		.end(done)
		done()
	});

	// it('should return 401 if user is not authenticated',(done)=>{

	// });

})


/*describe("GET /todos/:id",()=>{

	it("should give required data basd on id provided", (done)=>{
		var id = "5b4edf060ec7c483ab7f6d66";

		request(app)
		.get(`/todos/${id}`)
		.send({_id:id})
		.expect(200)
		.expect((res)=>{
			console.log(res.body);
			// expect(res.body).toBe(id);
			// expect(res.body).toBe(1);

		})
		.end((err,res)=>{
			console.log("err---",err,"res",res.body)
			if(err){
				return done(err);
			}

			done();
		})

	})
})*/
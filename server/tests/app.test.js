var expect= require("expect");
var request = require("supertest");

var {app} = require("./../app");
var {Todo} = require("./../model/todo");


beforeEach((done)=>{
	Todo.remove({}).then(() => done());
})

describe("POST /todos,",()=> {
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

})
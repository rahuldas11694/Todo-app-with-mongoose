var expect= require("expect");
var request = require("supertest");

var {app} = require("./../app");
var {Todo} = require("./../model/todo");


var id  = "5b4f1505a0b83c7693c3d43b";

describe("DELETE /todos/:id", ()=>{
	it("Should remove todo data",(done)=>{

		request(app)
			.delete(`/todos/${id}`)
			.expect(200)
			.expect((res)=>{
				console.log(res.body)
				expect(res.body.todo._id).toBe(id);
			})
			.end((err,res)=>{
				if(err){
					return done(err);
				}

				Todo.findById(id)
				.then((todo)=>{
					expect(id).toNotExist();
					done();
				})
				.catch((err)=>{
					console.log("err",err);
				done();
				})
			})
	})

	it("Should return 404 if object not found",(done)=>{

		request(app)
			.delete(`/todos/${id}`)
			.expect(404)
			.end(done)

	})

	it("Should return 404 if object not found",(done)=>{

		request(app)
			.delete(`/todos/123ds`)
			.expect(404)
			.end(done)

		})



})
// var {SHA256} = require('crypto-js');

// var msg = "hello world";

// var msgHash = SHA256(msg).toString();
// console.log(`Msg: ${msg}\n msgHash : ${msgHash}`);

// var data = {
// 	id : 4
// }
// // here querty is a sald that we are adding to a hashed data
// var token = {
// 	data,
// 	hash : SHA256(JSON.stringify(data) + "qwerty").toString()
// }

// //   changing data values
// // token.data.id = 3;
// // token.hash = SHA256(JSON.stringify(data)).toString();

// var reHash = SHA256(JSON.stringify(token.data) + "qwerty").toString();

// console.log(`reHash: ${reHash} \n token.hash : ${token.hash}`);

// if(reHash == token.hash){
// 	console.log("EQUALS");
// }
// else{

// 	console.log("NOT EQUALS");	
// }

/*var jwt = require('jsonwebtoken');

// jwt.sign = "rahuls"
// jwt.verify = 
var data = {
	id : 5
}

var token = jwt.sign(data, 'qwerty');

console.log("TOKEN : ", token);

var deToken = jwt.verify(token,'qwerty');

console.log("DE-TOKEN : ", deToken);
*/

var bcrypt = require('bcryptjs');

var password = "123123";
bcrypt.genSalt(10,(err,salt)=>{
	bcrypt.hash(password, salt, (err, hash)=>{
		console.log(`HASH: ${hash}`)
	})
})

var hashedPass = '$2a$10$Nnhdn/Y2LgBcIfVaqEcnfeSkFepH93.Le/nROlEap0wFufCbMjqp6';

bcrypt.compare(password, hashedPass, (err, res)=>{
	console.log("REsult", res);
})
/*Author:  Doug Cameron
June  14th, 2020
Course Module :  Web Application Development CPRG-210-OSD
Assignment : 5

---------------------------------------------------------------------
This the code so my website will run in Express and pug templates
AND pass data from the form to the database and then read it
and display in a pug file.
*/


const express = require("express");					// load express module
const app = express();								// initalize the server
const path = require("path");						//load path system module so we can work with paths
const newGreeting = require("./generateRandGreeting.js");//import the module that generates the greeting
														//and return the greeting to const 
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

app.listen(8000, ()=>{ 									//listen for requests on port 8000 
	console.log("The server has started on port 8000"); //log a message to indicate the server is started
});

app.set("views", path.join(__dirname, "views"));        //serve pug static assets in folder	views
app.set("view engine", "pug");							//tell express to use pug template engine				

app.use(express.static('img', {extensions: ["png", "jpg"]})); //serve pug static assets in img folder	
app.use(express.static('style'));							//serve style static assets in folder style

app.use(express.urlencoded( { extended: true } ));

app.get("/", (req, res)=>{									//create route for index page
	res.render("index", { greet : newGreeting.newGreeting()}); //pass the new greeting variable into the index page
});

app.get("/getaccount", (req, res)=>{                //set route to get the account information
	MongoClient.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}, (err, conn)=>{                               //if there are errors connecting throw err
		if (err) throw err;
		
		var dbo = conn.db("table-ready");           //connect to the table ready collection
		
		var query = { fname: "Douglas" };           //query the record with First Name = Douglas

		dbo.collection("resturantaccount").find(query).toArray((err, result)=>{ //run the query
			if (err) throw err;
				res.render('displayaccount', {"results": result[0] }); // render page with account into
			conn.close();
		});
	});
});


app.get("/contact", (req, res)=>{           //set route to get the contact form
	res.render("contact");
});

app.post("/create-post", (req, res)=>{  //set the endpoint that the form will communicated with
	
	MongoClient.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	  }, (err, conn)=> {
	  if (err) throw err;

	  var dbo = conn.db("table-ready"); //connect to the table ready collection

	  dbo.collection("resturantaccount").insertOne(req.body, function(err, res) { // insert record
		if (err) throw err;
		console.log("1 document inserted to the restaurant account");
		conn.close();
	  });
	});
		
	res.render("thanks");
});
app.use((req, res, next)=>{									//if no endpoints are found, send 404 page
	res.status(404).render("404", { msgFour0Four: "404 Error"});//pass in  msg variable into the 404 page
});
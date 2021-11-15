const express = require("express");
const server = express();
const PORT = process.env.PORT || 8080;
server.set("port", PORT);

const pg = require(`pg`);
const dbURI = "postgres://jvoxhpohivtauz:8c3c5997e8bdfab6b6ddca152f6cb7c4ec5eab0f8dad40739082b6e933c7ea9f@ec2-54-74-95-84.eu-west-1.compute.amazonaws.com:5432/ddic12hjvrjm67";
const connstring = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
	connectionString: connstring,
	ssl: { rejectUnauthorized: false }
});

// database methods ---------------------------
let dbMethods = {}; // create empty object

//  -------------------------------------------
dbMethods.getAllBlogPosts = function() {
	let sql = "SELECT * FROM blogposts"
	return pool.query(sql); // return the promise
}

//  -------------------------------------------
dbMethods.createBlogPosts = function(heading, blogtext, userid) {
	let sql = "INSERT INTO blogposts (id, date, heading, blogtext, userid) VALUES(DEFAULT, DEFAULT, $1, $2, $3) returning *";
	let values = [heading, blogtext, userid];
    return pool.query(sql, values); // return the promise
}

//  -------------------------------------------
dbMethods.deleteBlogPost = function(id) {
	let sql = "DELETE FROM blogposts WHERE id = $1 RETURNING *";
    let values = [id];
	return pool.query(sql, values); // return the promise
}

// export dbMethods ---------------------------
module.exports = dbMethods;

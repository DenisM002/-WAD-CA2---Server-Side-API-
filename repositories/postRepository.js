// Dependencies
// require the database connection
const { sql, dbConnPoolPromise } = require('../database/db.js');

// models
const Post = require('../models/post.js');

// Define SQL statements here for use in function below
// These are parameterised queries note @named parameters.
// Input parameters are parsed and set before queries are executed

// Get all posts from the posts table
// for json path - Tell MS SQL to return results as JSON (avoiding the need to convert here)
const SQL_SELECT_ALL = 'SELECT * FROM dbo.post ORDER BY _id DESC for json path;';

// Create a new post and return result
const SQL_INSERT = 'INSERT INTO dbo.post (post_title, post_body) VALUES (@postTitle, @postBody); SELECT * from dbo.post WHERE _id = SCOPE_IDENTITY();';

// Get all posts
// This is an async function named getposts defined using ES6 => syntax
let getPosts = async () => {
    // define variable to store posts
    let posts;

    // Get a DB connection and execute SQL (uses imported database module)
    // Note await in try/catch block
    try {
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // execute query
            .query(SQL_SELECT_ALL);

        // first element of the recordset contains posts
        posts = result.recordset[0];
        console.log(posts);

        // Catch and log errors to cserver side console 
    } catch (err) {
        console.log('DB Error - get all posts: ', err.message);
    }

    // return posts
    return posts;
};

// create a new product - parameter: a validated product model object
let createPost = async (post) => {
    // Declare constanrs and variables
    let insertedPost;
    // Insert a new post
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set named parameter(s) in query
            // checks for potential sql injection
            .input('postTitle', sql.NVarChar, post.post_title)
            .input('postBody', sql.NVarChar, post.post_body)
          
            // Execute Query
            .query(SQL_INSERT);

        // The newly inserted post is returned by the query
        insertedPost = result.recordset[0];
    } catch (err) {
        console.log('DB Error - error inserting a new post: ', err.message);
    }
    // Return the product data
    return insertedPost;

};


// Export 
module.exports = {
    getPosts,
    createPost
};

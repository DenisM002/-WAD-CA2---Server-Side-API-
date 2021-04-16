// Dependencies
// Input validation package
/*
    Do not have validation correct yet!!
const baseValidators = require('../validators/baseValidators.js');
*/


// Require the postValidator
const postValidator = require('../validators/postValidators.js');

// require the database connection
const postRepository = require('../repositories/postRepository.js');

// Get all products via the repository
// return products
let getPosts = async () => {
    const posts = await postRepository.getPosts();
    return posts;
};

// Create new post
// Insert a new Post
// This function accepts Post data as a paramter from the controller.
let createPost = async (post) => {
    // declare variables
    let newlyInsertedPost;
    // Call the post validator - kept seperate to avoid clutter here
    let validatedPost = postValidator.validateNewPost(post);
    // If validation returned a post object - save to database
    if (validatedPost != null) {
        newlyInsertedPost = await postRepository.createPost(validatedPost);
    } else {
        // post data failed validation
        newlyInsertedPost = { "error": "invalid post" };
        // log the result
        console.log("postService.createPost(): form data validate failed");
    }
    // return the newly inserted post
    return newlyInsertedPost;
};


// Module exports
// expose these functions
module.exports = {
    getPosts,
    createPost
};
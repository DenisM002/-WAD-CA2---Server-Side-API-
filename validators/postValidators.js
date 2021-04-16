// Input validation package
// https://www.npmjs.com/package/validator
const validator = require('validator');

// models
const Post = require('../models/post.js');

// Validate the body data, sent by the client, for a new post
// formPost represents the data filled in a form
// It needs to be validated before using in gthe application
let validateNewPost = (formPost) => {
    // Declare constants and variables
    let validatedPost;
    // debug to console - if no data
    if (formPost === null) {
        console.log("validateNewPost(): Parameter is null");
    }

    // Validate form data for new post fields
    // Creating a post does not need a post id
    // Adding '' to the numeric values makes them strings for validation purposes ()
    // appending + '' to numbers as the validator only works with strings
    if (
        validator.isNumeric(formPost._id + '', { no_symbols: true, allow_negatives: false }) &&
        !validator.isEmpty(formPost.post_title) &&
        !validator.isEmpty(formPost.post_body)) {
        // Validation passed
        // create a new Product instance based on Product model object
        // no value for post id (passed as null)
        validatedPost = new Post (
            formPost._id,
            // escape is to sanitize - it removes/ encodes any html tags
            validator.escape(formPost.post_title),
            validator.escape(formPost.post_body),
        );

    } else {
        // debug
        console.log("validateNewProduct(): Validation failed");
    }

    // return new validated post object
    return validatedPost;
}

// Module exports
// expose these functions

module.exports = {
    validateNewPost,
}
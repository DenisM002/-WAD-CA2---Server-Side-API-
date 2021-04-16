const router = require('express').Router();
const postService = require('../services/postService.js');

// Auth0
const { authConfig, checkJwt, checkAuth } = require('../middleware/jwtAuth.js');

// GET listing of all posts
// Address http://server:port/product
// returns JSON
router.get('/', async (req, res) => {

    // Get all posts
    try {
        // Call the product service to get a list of posts
        // getPosts() is an async function so use await
        const result = await postService.getPosts();
        // send json result via HTTP
        res.json(result);

        // Catch and send any errors  
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

router.post('/', async (req, res) => {

    // Request body contains the post data
    const newPost = req.body;
    // show what was copied in the console (server side)
    console.log("productController: ", newPost);
    // Create new posts
    try {
        // Call function to createPost
        const result = await postService.createPost(newPost);
        // send json result via HTTP
        res.json(result);

        // Catch and send any errors  
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});


// Export as a module
module.exports = router;
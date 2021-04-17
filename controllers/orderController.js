const router = require('express').Router();
const orderService = require('../services/orderService.js');

// Auth0
const { authConfig, checkJwt, checkAuth } = require('../middleware/jwtAuth.js');

// GET listing of all posts
// Address http://server:orders
// returns JSON
router.get('/', async (req, res) => {

    // Get all posts
    try {
        // Call the order service to get a list of orders
        // getOrders() is an async function so use await
        const result = await orderService.getOrders();
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
    const newOrder = req.body;
    // show what was copied in the console (server side)
    console.log("orderController: ", newOrder);
    // Create new posts
    try {
        // Call function to createPost
        const result = await orderService.createOrder(newOrder);
        // send json result via HTTP
        res.json(result);

        // Catch and send any errors  
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

router.put('/', async (req, res) => {

    // Request body contains the post data
    const order = req.body;
    // show what was copied in the console (server side)
    console.log("orderController update: ", order);
    // Create new posts
    try {
        // Call function to createPost
        const result = await orderService.updateOrder(order);
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
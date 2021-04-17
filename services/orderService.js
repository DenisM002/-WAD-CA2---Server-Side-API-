// Dependencies
// Input validation package
/*
    Do not have validation correct yet!!
const baseValidators = require('../validators/baseValidators.js');
*/


// Require the orderValidator
const orderValidator = require('../validators/orderValidators.js');

// require the database connection
const orderRepository = require('../repositories/orderRepository.js');

// Get all orders via the repository
// return orders
let getOrders = async () => {
    const orders = await orderRepository.getOrders();
    return orders;
};

// Create new order
// Insert a new Order
// This function accepts order data as a parameter from the controller.
let createOrder = async (order) => {
    // declare variables
    let newlyInsertedOrder;
    // Call the order validator - kept seperate to avoid clutter here
    let validatedOrder = orderValidator.validateNewOrder(order);
    // If validation returned a order object - save to database
    if (validatedOrder != null) {
        newlyInsertedOrder = await orderRepository.createOrder(validatedOrder);
    } else {
        // order data failed validation
        newlyInsertedOrder = { "error": "invalid order" };
        // log the result
        console.log("orderService.createOrder(): form data validate failed");
    }
    // return the newly inserted order
    return newlyInsertedOrder;
};


// Module exports
// expose these functions
module.exports = {
    getOrders,
    createOrder
};
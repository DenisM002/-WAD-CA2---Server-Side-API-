// Dependencies
// Input validation package

// Require the orderValidator
const orderValidator = require('../validators/orderValidators.js');
const baseValidators = require('../validators/baseValidators')

// require the database connection
const orderRepository = require('../repositories/orderRepository.js');

// Get all orders via the repository
// return orders
let getOrders = async () => {
    const orders = await orderRepository.getOrders();
    return orders;
};

// Create new order
// This function accepts order data as a parameter from the controller.
let createOrder = async (order) => {
    // declare variables
    let newlyInsertedOrder;
    // Call the order validator - kept seperate to avoid clutter here
    let validatedOrder = orderValidator.validateOrder(order);
    // If validation returned an order object - save to database
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

let updateOrder = async (order) => {
    // declare variables
    let updatedOrder;
    // Call the order validator - kept seperate to avoid clutter here
    let validatedOrder = orderValidator.validateOrder(order);
    // If validation returned an order object - save to database
    if (validatedOrder != null) {
        updatedOrder = await orderRepository.updateOrder(validatedOrder);
    } else {
        // order data failed validation
        updatedOrder = { "error": "invalid order" };
        // log the result
        console.log("orderService.updateOrder(): form data validate failed");
    }
    // return the newly inserted order
    return updatedOrder;
};

// Delete a single order by id
// Validate input, call repository, return result
let deleteOrder = async (orderId) => {
    let deleteResult = false;
    // Validate input
    // appending + '' to numbers as the validator only works with strings
    if (!baseValidators.id(orderId)) {
        console.log("deleteOrder service error: invalid id parameter");
        return false;
    }
    // delete order by id
    // returnds result: true or false
    deleteResult = await orderRepository.deleteOrder(orderId);
    // return true if successfully deleted
    return deleteResult;
};

// Module exports
// expose these functions
module.exports = {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder
};
// Input validation package
// https://www.npmjs.com/package/validator
const validator = require('validator');
const baseValidator = require('./baseValidators')

// models
const OrderDetails = require('../models/orderDetails.js');

// Validate the body data, sent by the client, for a new order
// formOrder represents the data filled in a form
// It needs to be validated before using in the application
let validateNewOrder = (formOrder) => {
    // Declare constants and variables
    let validatedOrder;

    // New orders do not have an ID
    let orderID = 0;

    // debug to console - if no data
    if (formOrder === null) {
        console.log("validateNewOrder(): Parameter is null");
    }

    // Validate form data for new order fields
    // Creating an order does not need an order id
    // Adding '' to the numeric values makes them strings for validation purposes ()
    // appending + '' to numbers as the validator only works with strings
        
    if (
        baseValidator.id(orderID) &&
        !validator.isEmpty(formOrder.orderDetails_name) &&
        !validator.isEmpty(formOrder.orderDetails_mobile) &&
        !validator.isEmpty(formOrder.orderDetails_email) &&
        validator.isInt((formOrder.orderDetails_burger + "")) && 
        validator.isInt((formOrder.orderDetails_kebab + "")) && 
        validator.isInt((formOrder.orderDetails_chip + "")) &&
        validator.isInt((formOrder.orderDetails_drink + "")) &&
        !validator.isEmpty(formOrder.orderDetails_info) ){

        // Validation passed
        // create a new OrderDetails instance based on OrderDetails model object
        // no value for order id (passed as null)
        validatedOrder = new OrderDetails (
            null,
            // escape is to sanitize - it removes/ encodes any html tags
            validator.escape(formOrder.orderDetails_name),
            validator.escape(formOrder.orderDetails_mobile),
            validator.escape(formOrder.orderDetails_email),
            formOrder.orderDetails_burger,
            formOrder.orderDetails_kebab,
            formOrder.orderDetails_chip,
            formOrder.orderDetails_drink,
            validator.escape(formOrder.orderDetails_info)
        );

    } else {
        // debug
        console.log("validateNewOrder(): Validation failed");
    }

    // return new validated order object
    return validatedOrder;
}


module.exports = {
    validateNewOrder,
}
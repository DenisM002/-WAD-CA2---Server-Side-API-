// Dependencies
// require the database connection
const { sql, dbConnPoolPromise } = require('../database/db.js');

// Define SQL statements here for use in function below
// These are parameterised queries note @named parameters.
// Input parameters are parsed and set before queries are executed

// Get all orders from the orderDetails table
// for json path - Tell MS SQL to return results as JSON (avoiding the need to convert here)
const SQL_SELECT_ALL = 'SELECT * FROM dbo.orderDetails ORDER BY _id ASC for json path;';

// Create a new order and return result
const SQL_INSERT = 'INSERT INTO dbo.orderDetails (orderDetails_name, orderDetails_mobile, orderDetails_email, orderDetails_burger, orderDetails_kebab, orderDetails_chip, orderDetails_drink, orderDetails_info) VALUES (@orderName, @orderMobile, @orderEmail, @orderBurger, @orderKebab, @orderChip, @orderDrink, @orderInfo); SELECT * from dbo.orderDetails WHERE _id = SCOPE_IDENTITY();';
// Update existing product
const SQL_UPDATE = 'UPDATE dbo.orderDetails SET orderDetails_name = @orderName, orderDetails_mobile = @orderMobile, orderDetails_email = @orderEmail, orderDetails_burger = @orderBurger, orderDetails_kebab = @orderkebab, orderDetails_chip = @orderChip, orderDetails_drink = @orderDrink, orderDetails_info = @orderInfo  WHERE _id = @id; SELECT * FROM dbo.orderDetails WHERE _id = @id;';


// Get all orders
// This is an async function named getOrders defined using ES6 => syntax
let getOrders = async () => {
    // define variable to store orderDetails
    let orders;

    // Get a DB connection and execute SQL (uses imported database module)
    // Note await in try/catch block
    try {
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // execute query
            .query(SQL_SELECT_ALL);

        // first element of the recordset contains posts
        orders = result.recordset[0];
        console.log(orders);

        // Catch and log errors to cserver side console 
    } catch (err) {
        console.log('DB Error - get all orders: ', err.message);
    }

    // return posts
    return orders;
};

// create a new product - parameter: a validated product model object
let createOrder = async (order) => {
    // Declare constants and variables
    let insertedOrder;
    // Insert a new order
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set named parameter(s) in query
            // checks for potential sql injection
            .input('orderName', sql.NVarChar, order.orderDetails_name)
            .input('orderMobile', sql.NVarChar, order.orderDetails_mobile)
            .input('orderEmail', sql.NVarChar, order.orderDetails_email)
            .input('orderBurger', sql.Int, order.orderDetails_burger)
            .input('orderKebab', sql.Int, order.orderDetails_kebab)
            .input('orderChip', sql.Int, order.orderDetails_chip)
            .input('orderDrink', sql.Int, order.orderDetails_drink)
            .input('orderInfo', sql.Text, order.orderDetails_info)
                
            // Execute Query
            .query(SQL_INSERT)

        // The newly inserted order is returned by the query
        insertedPost = result.recordset[0];
    } catch (err) {
        console.log('DB Error - error inserting a new order: ', err.message);
    }
    // Return the product data
    return insertedOrder;

};

// create a new product - parameter: a validated product model object
let updateOrder = async (order) => {
    // Declare constants and variables
    let updatedOrder;
    // Insert a new order
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set named parameter(s) in query
            // checks for potential sql injection
            .input('id', sql.Int, order._id)
            .input('orderName', sql.NVarChar, order.orderDetails_name)
            .input('orderMobile', sql.NVarChar, order.orderDetails_mobile)
            .input('orderEmail', sql.NVarChar, order.orderDetails_email)
            .input('orderBurger', sql.Int, order.orderDetails_burger)
            .input('orderKebab', sql.Int, order.orderDetails_kebab)
            .input('orderChip', sql.Int, order.orderDetails_chip)
            .input('orderDrink', sql.Int, order.orderDetails_drink)
            .input('orderInfo', sql.Text, order.orderDetails_info)
                
            // Execute Query
            .query(SQL_UPDATE)

        // The newly inserted order is returned by the query
        insertedPost = result.recordset[0];
    } catch (err) {
        console.log('DB Error - error updating order: ', err.message);
    }
    // Return the product data
    return updatedOrder;

};


// Export 
module.exports = {
    getOrders,
    createOrder,
    updateOrder
};
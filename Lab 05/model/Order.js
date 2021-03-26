const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    item: String,
    customer_name: String
});

const Order = mongoose.model('Order', orderSchema, 'Orders');
module.exports = Order;
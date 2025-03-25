const mongoose = require('mongoose');

const orderschema = mongoose.Schema({
    name: {
        type: String
    },
    amount: {
        type: Number
    },
    order_id: {
        type: String
    },
    razorpay_payment_id: {
        type: String,
        default: null
    },
    razorpay_order_id: {
        type: String,
        default: null
    },
    razorpay_signature: {
        type: String,
        default: null
    }
}
,{
    timeStamp: true
});

const orderModel = mongoose.model('order', orderschema);

module.exports = orderModel;


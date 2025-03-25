
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const orderModel = require('./models/Order');

const app = express();

const razorpay = new Razorpay({
    key_id: "rzp_test_g6wCaV4ReXobCV",
    key_secret: "KDKlmMsFeXbny0hAzXWL1PYC",
});

mongoose.connect('mongodb://127.0.0.1:27017/react_razorpay')
.then(() => {
    console.log('MongoDB Connected...');
})
.catch(() => {
    console.log('Not Connected...');
})

app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET', "POST"],
}));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.post('/payment/checkout', async(req, res) => {
    const {name, amount} = req.body;

    const order = await razorpay.orders.create({
        amount: Number(amount * 100),
        currency: "INR"
    });

    await orderModel.create({
        order_id: order.id,
        name:  name,
        amount: amount,
    });

    console.log({order});
    res.json({order});
});

app.post('/payment/payment-verification', async(req, res) => {
    const {razorpay_payment_id,  razorpay_order_id, razorpay_signature} = req.body;

    const body_data = razorpay_order_id+"|"+razorpay_payment_id;

    const expect = crypto.createHmac('sha256', 'KDKlmMsFeXbny0hAzXWL1PYC').update(body_data).digest('hex');

    const isValid = expect === razorpay_signature;
    if(isValid) {
        await orderModel.findOne({order_id: razorpay_order_id}, {
            $set: {
                razorpay_payment_id, razorpay_order_id, razorpay_signature
            }
        })
        res.redirect(`http://localhost:3000/success?payment_id=${razorpay_payment_id}`);
        return
    } else {
        res.redirect('http://localhost:3000/failed');
        return
    }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
});


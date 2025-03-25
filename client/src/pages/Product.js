import React from 'react';
import Card from '../Components/Card';
import ProductData from '../api/product.json';
import axios from 'axios';

const Product = () => {

  const checkoutHandler = async ({name, amount}) => {
    const { data: { order } } = await axios.post("http://localhost:5000/payment/checkout", {
      name, amount
    });

    try {
      var options = {
        "key": "rzp_test_g6wCaV4ReXobCV", // Enter the Key ID generated from the Dashboard
        "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": order.currency,
        "name": "ABC",
        "description": "Test Transaction",
        "image": "",
        "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": "http://localhost:5000/payment/payment-verification",
        "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "9000090000"
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#3399cc"
        }
      };
  
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {
              ProductData.map((c, i) => {
                return (
                  <Card key={i} image={c.image} title={c.title} price={c.price} description={c.description} category={c.category}
                    onCheckout={checkoutHandler} />
                )
              })
            }

          </div>
        </div>
      </section>
    </>
  )
}

export default Product;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, detailsOrder, payOrder } from '../actions/orderActions';
function OrderScreen(props) {

//   const orderPay = useSelector(state => state.orderPay);
//   const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;

    
  const dispatch = useDispatch();
  useEffect(() => {
     {
      dispatch(detailsOrder(props.match.params.id));
    }
    
  }, []);

 function homeHandler()
  {
      props.history.push("/")
  }

//   const handleSuccessPayment = (paymentResult) => {
//     dispatch(payOrder(order, paymentResult));
//   }

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;
  

  return loading ? <div>Loading ...</div> : error ? <div>{error}</div> :

    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3 style={{textAlign:"center"}}>
              Order Summary
          </h3>
          <h3>Shipping Address</h3>
            <div>
              {order.shipping.address}, {order.shipping.city},
          {order.shipping.postalCode}, {order.shipping.country}
          <br></br>
          <h2>Contact Number: {order.shipping.contact}</h2>
          </div>
            <div>
              {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered Yet."}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>
              Payment Method: {order.payment.paymentMethod}
            </div>
            <div>
              {order.isPaid ? "Paid at " + order.paidAt : "Cash On Delivery."}
            </div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>
                  Order Summary
          </h3>
                <div>
                  Price
          </div>
              </li>
              {
                order.orderItems.length === 0 ?
                  <div>
                    Cart is empty
          </div>
                  :
                  order.orderItems.map(item =>
                    <li key={item._id}>
                      <div className="cart-image">
                        <img src={item.image} alt="product" />
                      </div>
                      <div className="cart-name">
                        <div>
                          <Link to={"/product/" + item.product}>
                            {item.name}
                          </Link>

                        </div>
                        <div>
                          Qty: {item.qty}
                        </div>
                      </div>
                      <div className="cart-price">
                        ₹{item.price}
                      </div>
                    </li>
                  )
              }
            </ul>
          </div>


        </div>
        <div className="placeorder-action">
          <ul>
            {/* <li className="placeorder-actions-payment">
              {loadingPay && <div>Finishing Payment...</div>}
              {!order.isPaid &&
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment} />
              }
            </li> */}
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>₹{order.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>₹{order.shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>₹{order.taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>₹{order.totalPrice}</div>
            </li>
            <li>
                <button className="button"  onClick = {homeHandler}>Shop More</button>
            </li>
          </ul>



        </div>

      </div>
    </div>

}

export default OrderScreen;
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    if (!Array.isArray(cart) || cart.length === 0) return (0).toFixed(2);
    const total = cart.reduce((sum, item) => {
      const price = Number(item.cost ?? item.price ?? 0);
      const qty = Number(item.quantity ?? 0);
      return sum + price * qty;
    }, 0);
    return total.toFixed(2);
  };

  const handleContinueShopping = (e) => {
    if (typeof onContinueShopping === 'function') onContinueShopping();
  };



  const handleIncrement = (item) => {
    if (!item) return;
    const id = item.id ?? item.name;
    const curr = Number(item.quantity ?? 0);
    dispatch(updateQuantity({ id: item.id, name: item.name, quantity: curr + 1 }));
  };

  const handleDecrement = (item) => {
    if (!item) return;
    const curr = Number(item.quantity ?? 0);
    dispatch(updateQuantity({ id: item.id, name: item.name, quantity: curr - 1 }));
  };
  };

  const handleRemove = (item) => {
    if (!item) return;
    dispatch(removeItem(item.id ?? item.name ?? item));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;



import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeItem } from './CartSlice.jsx';
import { Link } from 'react-router-dom';

export default function CartPage() {
    const dispatch = useDispatch();
    const items = useSelector((s) => s.cart.items || []);

    const onIncrease = (id, curr) => dispatch(updateQuantity({ id, quantity: curr + 1 }));
    const onDecrease = (id, curr) => dispatch(updateQuantity({ id, quantity: curr - 1 }));
    const onRemove = (id) => dispatch(removeItem(id));

    const total = items.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 0), 0);

    return (
        <div style={{ padding: 16 }}>
            <h2>Your Cart</h2>
            {items.length === 0 ? (
                <div>
                    <p>Your cart is empty.</p>
                    <Link to="/plants"><button className="btn-secondary">Continue Shopping</button></Link>
                </div>
            ) : (
                <>
                    <div className="cart-list">
                        {items.map((it) => (
                            <div className="cart-item" key={it.id}>
                                <img src={it.img} alt={it.name} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 700 }}>{it.name}</div>
                                    <div>Unit price: ${Number(it.price).toFixed(2)}</div>
                                    <div>Item total: ${(Number(it.price) * (it.quantity || 0)).toFixed(2)}</div>
                                </div>
                                <div className="qty-controls">
                                    <button onClick={() => onDecrease(it.id, it.quantity || 0)}>-</button>
                                    <div>{it.quantity || 0}</div>
                                    <button onClick={() => onIncrease(it.id, it.quantity || 0)}>+</button>
                                </div>
                                <div>
                                    <button onClick={() => onRemove(it.id)} className="btn-secondary">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="totals">Cart Total: ${total.toFixed(2)}</div>
                    <div className="actions">
                        <button className="primary" onClick={() => alert('Coming Soon')}>Checkout</button>
                        <Link to="/plants"><button className="btn-secondary">Continue Shopping</button></Link>
                    </div>
                </>
            )}
        </div>
    );
}
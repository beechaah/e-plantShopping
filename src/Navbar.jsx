import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navbar() {
    const items = useSelector((s) => s.cart.items || []);
    const totalCount = items.reduce((sum, it) => sum + (it.quantity || 0), 0);

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/">Paradise Nursery</Link>
                <Link to="/plants">Plants</Link>
                <Link to="/about">About</Link>
            </div>
            <div className="nav-right">
                <Link to="/cart">Cart ({totalCount})</Link>
            </div>
        </nav>
    );
}
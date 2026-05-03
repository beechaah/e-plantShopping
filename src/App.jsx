import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import ProductList from './ProductList.jsx';
import CartPage from './CartPage.jsx';
import AboutUs from './AboutUs.jsx';

const Landing = () => {
    const nav = useNavigate();
    return (
        <div className="landing">
            <div className="landing-overlay">
                <h1>Paradise Nursery</h1>
                <p>Bring green life into your home.</p>
                <button className="primary" onClick={() => nav('/plants')}>Get Started</button>
            </div>
        </div>
    );
};

export default function App() {
    return (
        <>
            <Navbar />
            <main className="app-container">
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/plants" element={<ProductList />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/about" element={<AboutUs />} />
                </Routes>
            </main>
        </>
    );
}
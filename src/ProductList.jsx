import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';

const DATA = [
    {
        category: 'Tropical',
        items: [
            { id: 't1', name: 'Monstera Deliciosa', price: 24.99, img: 'https://images.unsplash.com/photo-1524594154906-4b3c7f3a1b6a?auto=format&fit=crop&w=400&q=60' },
            { id: 't2', name: 'Bird of Paradise', price: 34.0, img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=400&q=60' },
            { id: 't3', name: 'Calathea Orbifolia', price: 18.5, img: 'https://images.unsplash.com/photo-1587502536263-3a1d4bda5f3f?auto=format&fit=crop&w=400&q=60' },
            { id: 't4', name: 'Alocasia Polly', price: 22.0, img: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=400&q=60' },
            { id: 't5', name: 'Philodendron Brasil', price: 15.0, img: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=400&q=60' },
            { id: 't6', name: 'Fiddle Leaf Fig', price: 45.0, img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=60' },
        ],
    },
    {
        category: 'Succulents',
        items: [
            { id: 's1', name: 'Echeveria', price: 8.99, img: 'https://images.unsplash.com/photo-1600488991593-38b7f2e6379d?auto=format&fit=crop&w=400&q=60' },
            { id: 's2', name: 'Haworthia', price: 7.5, img: 'https://images.unsplash.com/photo-1618233698435-6d9b62d1b2b6?auto=format&fit=crop&w=400&q=60' },
            { id: 's3', name: 'Aloe Vera', price: 9.0, img: 'https://images.unsplash.com/photo-1556228720-4b68b3d0f3f5?auto=format&fit=crop&w=400&q=60' },
            { id: 's4', name: 'Sedum', price: 6.0, img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=60' },
            { id: 's5', name: 'Crassula (Jade)', price: 11.0, img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=400&q=60' },
            { id: 's6', name: 'Sempervivum', price: 6.5, img: 'https://images.unsplash.com/photo-1601758003122-5f24c0b6a8a1?auto=format&fit=crop&w=400&q=60' },
        ],
    },
    {
        category: 'Air & Low Light',
        items: [
            { id: 'a1', name: 'Snake Plant', price: 14.0, img: 'https://images.unsplash.com/photo-1556910103-1a9c79a3d9a0?auto=format&fit=crop&w=400&q=60' },
            { id: 'a2', name: 'ZZ Plant', price: 16.5, img: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=60' },
            { id: 'a3', name: 'Pothos', price: 12.0, img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=60' },
            { id: 'a4', name: 'Peace Lily', price: 13.0, img: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=400&q=60' },
            { id: 'a5', name: 'Cast Iron Plant', price: 19.0, img: 'https://images.unsplash.com/photo-1616627566289-9d0d1b8f6a7e?auto=format&fit=crop&w=400&q=60' },
            { id: 'a6', name: 'Spider Plant', price: 9.99, img: 'https://images.unsplash.com/photo-1589987607024-85e0fbd0b2a0?auto=format&fit=crop&w=400&q=60' },
        ],
    },
];

export default function ProductList() {
    const dispatch = useDispatch();
    const cartItems = useSelector((s) => s.cart.items || []);
    const addedIds = useMemo(() => new Set(cartItems.map((i) => i.id)), [cartItems]);

    const handleAdd = (product) => {
        dispatch(addItem({ id: product.id, name: product.name, price: product.price, img: product.img, quantity: 1 }));
    };

    return (
        <div>
            <h2>Products</h2>
            <div className="categories">
                {DATA.map((cat) => (
                    <section key={cat.category} className="category">
                        <h3>{cat.category}</h3>
                        <div className="products">
                            {cat.items.map((p) => (
                                <div className="card" key={p.id}>
                                    <img src={p.img} alt={p.name} />
                                    <h4>{p.name}</h4>
                                    <div className="price">${p.price.toFixed(2)}</div>
                                    <button
                                        onClick={() => handleAdd(p)}
                                        disabled={addedIds.has(p.id)}
                                        style={{ background: addedIds.has(p.id) ? '#ccc' : '#2d8a4d', color: '#fff' }}
                                    >
                                        {addedIds.has(p.id) ? 'Added' : 'Add to Cart'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
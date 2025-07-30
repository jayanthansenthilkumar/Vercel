import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Laptop from './laptop'; // Make sure Laptop component exists and accepts correct props

const LaptopList = () => {
    const [laptops, setLaptops] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLaptops = async () => {
            const res = await fetch('https://fakestoreapi.com/products');
            const data = await res.json();
            setLaptops(data);
        };
        fetchLaptops();
    }, []);

    const handleAddToCart = (id) => {
        setCartItems((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
    };

    const handleUpdateCount = (id, newCount) => {
        setCartItems((prev) => {
            if (newCount <= 0) {
                const updated = { ...prev };
                delete updated[id];
                return updated;
            }
            return {
                ...prev,
                [id]: newCount,
            };
        });
    };

    const handleAdd = (id) => {
        setCartItems((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
    };

    const handleRemove = (id) => {
        setCartItems((prev) => {
            const updated = { ...prev };
            if (updated[id] > 1) {
                updated[id] -= 1;
            } else {
                delete updated[id];
            }
            return updated;
        });
    };

    const onAddToCart = (id) => {
        setCartItems((prev) => ({
            ...prev,
            [id]: 1,
        }));
    };

    const itemsInCart = laptops.filter((l) => cartItems[l.id] > 0);

    return (
        <>
            <div className="laptop-list">
                {laptops.map((laptop) => (
                    <Laptop
                        key={laptop.id}
                        img={laptop.image}
                        price={(laptop.price * 80).toFixed(2)}
                        mrp={(laptop.price * 1.8).toFixed(2)}
                        discount={Math.round((1 - laptop.price / (laptop.price * 1.8)) * 100) + '% off'}
                        color1="grey"
                        color2="black"
                        color3="silver"
                        delivery={`FREE delivery 2-5 days`}
                        reviews={laptop.rating.count}
                        title={laptop.title}
                        rating={laptop.rating.rate}
                        count={cartItems[laptop.id] || 0}
                        onAddToCart={() => handleAddToCart(laptop.id)}
                        onUpdateCount={(newCount) =>
                            handleUpdateCount(laptop.id, newCount)
                        }
                    />
                ))}
            </div>

            {itemsInCart.length > 0 && (
                <div className="cartitems">
                    <h4>Subtotal</h4>
                    <h3>
                        ₹
                        {itemsInCart
                            .reduce(
                                (total, item) =>
                                    total + parseFloat(item.price * 80) * cartItems[item.id],
                                0
                            )
                            .toFixed(2)}
                    </h3>
                    <h4>
                        Your order is eligible for FREE Delivery.
                        <a href="/"> Details</a>
                    </h4>
                    <button className="checkout-btn" onClick={() => navigate('/cart')}>
                        Go to Cart
                    </button>

                    <div className="lapimg">
                        {itemsInCart.map((laptop) => (
                            <div key={laptop.id} className="cartitem">
                                <img className="cartitemimg" src={laptop.image} alt="Laptop" />
                                <div className="quantity-controls">
                                    {cartItems[laptop.id] === 0 ? (
                                        <button className="buy" onClick={() => onAddToCart(laptop.id)}>
                                            Add to cart
                                        </button>
                                    ) : (
                                        <button className="buy" style={{ width: '115px' }}>
                                            {cartItems[laptop.id] === 1 ? (
                                                <span
                                                    onClick={() => handleRemove(laptop.id)}
                                                    className="fa fa-trash"
                                                ></span>
                                            ) : (
                                                <span
                                                    onClick={() => handleRemove(laptop.id)}
                                                    className="fa fa-minus"
                                                ></span>
                                            )}
                                            &nbsp;&nbsp;&nbsp;
                                            <span className="count">{cartItems[laptop.id]}</span>&nbsp;&nbsp;&nbsp;
                                            <span
                                                onClick={() => handleAdd(laptop.id)}
                                                className="fa fa-plus add"
                                            ></span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default LaptopList;

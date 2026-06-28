import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useApp = () => {
    return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [view, setView] = useState('home'); // 'home', 'customize', 'cart', 'booking'
    const [customizeItem, setCustomizeItemState] = useState(null);
    const [toasts, setToasts] = useState([]);
    const [bookings, setBookings] = useState([]);

    // Auto-dismiss toasts
    const addToast = (message, type = 'success') => {
        const id = Date.now() + Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            removeToast(id);
        }, 4000);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const setCustomizeItem = (item) => {
        setCustomizeItemState(item);
        if (item) {
            setView('customize');
        }
    };

    const setCartOpen = (isOpen) => {
        if (isOpen) {
            setView('cart');
        } else {
            setView('home');
        }
    };

    const setBookingOpen = (isOpen) => {
        if (isOpen) {
            setView('booking');
        } else {
            setView('home');
        }
    };

    const addToCart = (item, quantity, specs) => {
        const { size, milk, sweetener, extraShots, price } = specs;
        const customId = `${item.id}-${size}-${milk}-${sweetener}-${extraShots}`;

        setCart((prevCart) => {
            const existingIndex = prevCart.findIndex((i) => i.customId === customId);
            if (existingIndex > -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingIndex].quantity += quantity;
                addToast(`Updated quantity of ${item.name} in cart!`, 'success');
                return updatedCart;
            } else {
                addToast(`Added ${item.name} to cart!`, 'success');
                return [...prevCart, {
                    ...item,
                    customId,
                    quantity,
                    size,
                    milk,
                    sweetener,
                    extraShots,
                    price,
                    basePrice: item.price || 3.75
                }];
            }
        });
        // Go to cart page after adding
        setView('cart');
    };

    const removeFromCart = (customId) => {
        const item = cart.find(i => i.customId === customId);
        if (item) {
            setCart((prev) => prev.filter((i) => i.customId !== customId));
            addToast(`Removed ${item.name} from cart`, 'info');
        }
    };

    const updateQuantity = (customId, delta) => {
        setCart((prevCart) =>
            prevCart.map((item) => {
                if (item.customId === customId) {
                    const newQty = item.quantity + delta;
                    return { ...item, quantity: Math.max(1, newQty) };
                }
                return item;
            })
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const bookTable = (bookingDetails) => {
        const bookingId = 'BH-' + Math.floor(100000 + Math.random() * 900000);
        const newBooking = { ...bookingDetails, id: bookingId, dateCreated: new Date().toLocaleDateString() };
        setBookings((prev) => [...prev, newBooking]);
        addToast(`Table reserved! Booking ID: ${bookingId}`, 'success');
        return newBooking;
    };

    return (
        <AppContext.Provider
            value={{
                cart,
                view,
                setView,
                cartOpen: view === 'cart',
                setCartOpen,
                bookingOpen: view === 'booking',
                setBookingOpen,
                customizeItem,
                setCustomizeItem,
                toasts,
                addToast,
                removeToast,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                bookings,
                bookTable
            }}
        >
            {children}
        </AppContext.Provider>
    );
};


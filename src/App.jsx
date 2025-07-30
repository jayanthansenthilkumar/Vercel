import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import LaptopHeader from './LaptopHeader';
import LaptopList from './LaptopList';
import CartComponent from './CartComponent'; // This will be the Cart Page

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <BrowserRouter>
      <div className="header">
        <Header cartCount={cartCount} />
      </div>
      <Navbar />
      <Sidebar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <LaptopHeader />
              <LaptopList cartCount={cartCount} setCartCount={setCartCount} />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <CartComponent cartCount={cartCount} setCartCount={setCartCount} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

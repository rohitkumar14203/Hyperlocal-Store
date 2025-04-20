import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import OrderConfirmation from "./pages/OrderConfirmation";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/store/:storeName/products" element={<Products />} />
        <Route path="/order" element={<OrderConfirmation />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

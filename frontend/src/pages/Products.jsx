import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, ChevronLeft, Package, PlusCircle } from "lucide-react";

const ProductPage = () => {
  const { storeName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:8000/api/store/${storeName}/products`
        );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Load existing cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || {};
    setCart(storedCart);
  }, [storeName]);

  const addToCart = (product) => {
    const updatedCart = {
      ...cart,
      [product.name]: {
        ...product,
        qty: cart[product.name]?.qty + 1 || 1,
      },
    };
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  const cartItemCount = Object.values(cart).reduce(
    (sum, item) => sum + item.qty,
    0
  );

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 flex items-center mr-4"
        >
          <ChevronLeft size={20} />
          <span className="ml-1">Back</span>
        </button>
        <h2 className="text-2xl font-bold capitalize flex items-center">
          <Package size={22} className="mr-2 text-gray-700" />
          {storeName} - Products
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No products available</p>
        </div>
      ) : (
        <div className="space-y-3  mb-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex justify-between items-center border p-4 rounded-lg shadow-sm bg-white"
            >
              <div className=" ">
                <p className="font-semibold px-7  text-gray-800">
                  {product.name}
                </p>
                <p className="text-gray-600 font-medium">₹{product.price}</p>
              </div>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md flex items-center transition-colors"
                onClick={() => addToCart(product)}
              >
                <PlusCircle size={16} className="mr-1" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center w-full transition-colors"
        onClick={handleViewCart}
        disabled={cartItemCount === 0}
      >
        <ShoppingCart size={18} className="mr-2" />
        View Cart ({cartItemCount})
      </button>
    </div>
  );
};

export default ProductPage;

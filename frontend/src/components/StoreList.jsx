import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store, MapPin, ChevronRight } from "lucide-react";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/api/stores")
      .then((res) => res.json())
      .then((data) => {
        setStores(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch stores", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Store className="text-blue-600 mr-2" size={24} />
        <h1 className="text-2xl font-bold">Hyperlocal Stores</h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stores.map((store) => (
            <div
              key={store._id}
              className="border p-4 rounded-lg shadow bg-white hover:shadow-md cursor-pointer transition-shadow"
              onClick={() => navigate(`/store/${store.name}/products`)}
            >
              <h2 className="text-lg font-semibold">{store.name}</h2>
              <div className="flex items-center text-gray-500 mt-2">
                <MapPin size={16} className="mr-1" />
                <p>{store.location}</p>
              </div>
              <div className="flex justify-end mt-2">
                <ChevronRight size={20} className="text-blue-500" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreList;

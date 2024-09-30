// components/FirstDealer.tsx
"use client";
import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

const FirstDealer: React.FC = () => {
  const [dealerName] = useState<string>("First Dealer");
  const [dealerContact, setDealerContact] = useState<string>("firstdealer@example.com");
  const [products] = useState<Product[]>([
    { id: 1, name: "Product A", price: 100, inStock: true },
    { id: 2, name: "Product B", price: 150, inStock: false },
    { id: 3, name: "Product C", price: 200, inStock: true },
  ]);

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDealerContact(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-white">{dealerName}</h2>

      {/* Editable Contact Info */}
      <label htmlFor="contact" className="block text-lg mb-2 font-semibold text-gray-300">
        Contact:
      </label>
      <input
        id="contact"
        type="text"
        value={dealerContact}
        onChange={handleContactChange}
        className="mb-4 p-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
        placeholder="Enter contact email"
      />

      <h3 className="text-2xl font-semibold mb-4 text-white">Product List</h3>
      <table className="min-w-full border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-600">
            <th className="border border-gray-700 p-2 text-left text-white">Product Name</th>
            <th className="border border-gray-700 p-2 text-left text-white">Price</th>
            <th className="border border-gray-700 p-2 text-left text-white">In Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-700">
              <td className="border border-gray-700 p-2 text-gray-300">{product.name}</td>
              <td className="border border-gray-700 p-2 text-gray-300">${product.price}</td>
              <td className="border border-gray-700 p-2 text-gray-300">{product.inStock ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FirstDealer;

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
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6">{dealerName}</h2>

      {/* Editable Contact Info */}
      <label htmlFor="contact" className="block text-lg mb-2 font-semibold">
        Contact:
      </label>
      <input
        id="contact"
        type="text"
        value={dealerContact}
        onChange={handleContactChange}
        className="mb-4 p-2 border border-gray-400 rounded-md"
      />

      <h3 className="text-2xl font-semibold mb-4">Product List</h3>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Product Name</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">In Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border border-gray-300 p-2">{product.name}</td>
              <td className="border border-gray-300 p-2">${product.price}</td>
              <td className="border border-gray-300 p-2">{product.inStock ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FirstDealer;

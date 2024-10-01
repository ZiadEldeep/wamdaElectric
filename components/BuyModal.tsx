// components/BuyModal.tsx
"use client";
import React, { useState } from "react";

interface BuyModalProps {
  productName: string;
  productPrice: string;
  isOpen: boolean;
  onClose: () => void;
}

const BuyModal: React.FC<BuyModalProps> = ({ productName, productPrice, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Purchasing:", { productName, quantity, name, email });
    // Reset form
    setQuantity(1);
    setName("");
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Purchase {productName}</h2>
        <p className="mb-4 text-lg text-gray-600">Price: {productPrice}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 text-black rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 text-black rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border border-gray-300 text-black rounded-md p-2 w-full"
              min="1"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 transition duration-300">Submit</button>
          <button type="button" className="mt-2 text-red-500 w-full" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default BuyModal;

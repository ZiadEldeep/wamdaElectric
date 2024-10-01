// components/ProductManagement.tsx
"use client"
import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<{ name: string; price: number }>({
    name: '',
    price: 0,
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product = {
      id: products.length + 1,
      name: newProduct.name,
      price: newProduct.price,
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', price: 0 });
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="p-8 bg-gray-200 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">Product Management</h2>
      <form onSubmit={handleAddProduct} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Add New Product</h3>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="flex-1 p-3 border border-gray-400 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
            className="w-32 p-3 border border-gray-400 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <button type="submit" className="bg-blue-700 text-white p-3 rounded-md hover:bg-blue-800 transition duration-200">
            Add Product
          </button>
        </div>
      </form>

      <ul className="space-y-4">
        {products.map(product => (
          <li key={product.id} className="flex justify-between items-center p-4 bg-white shadow rounded-lg hover:shadow-lg transition duration-200">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => handleDeleteProduct(product.id)}
              className="bg-red-700 text-white p-2 rounded-md hover:bg-red-600 transition duration-200"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;

// components/LandingPage.tsx
"use client";
import React, { useState } from "react";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import BuyModal from "./BuyModal";
import "swiper/swiper-bundle.css"; // Import Swiper styles

// Sample electric products data with multiple images
const productImages = [
  { name: "Electric Product 1", price: "$10", images: ["/images/pic1.webp", "/images/pic2.webp"] },
  { name: "Electric Product 1", price: "$10", images: ["/images/pic1.webp", "/images/pic2.webp"] },
  { name: "Electric Product 1", price: "$10", images: ["/images/pic1.webp", "/images/pic2.webp"] },
  { name: "Electric Product 2", price: "$20", images: ["/images/pic3.webp", "/images/pic4.webp"] },
  { name: "Electric Product 2", price: "$20", images: ["/images/pic3.webp", "/images/pic4.webp"] },
  { name: "Electric Product 2", price: "$20", images: ["/images/pic3.webp", "/images/pic4.webp"] },
  { name: "Electric Product 3", price: "$30", images: ["/images/pic5.webp", "/images/pic1.webp"] },
  { name: "Electric Product 3", price: "$30", images: ["/images/pic5.webp", "/images/pic1.webp"] },
  { name: "Electric Product 3", price: "$30", images: ["/images/pic5.webp", "/images/pic1.webp"] },
  // Add more products as needed
];

SwiperCore.use([Autoplay]);

const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(productImages[0]);

  const handleSlideChange = (swiper: any) => {
    setActiveProduct(productImages[swiper.activeIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white">
      {/* Header Section */}
      <header className="flex justify-between items-center p-6 bg-black/60 shadow-lg backdrop-blur-lg">
        <h1 className="text-4xl font-bold text-blue-400">Wamda</h1>
        <nav>
  <ul className="flex space-x-4">
    <li><a href="#products" className="hover:underline">Products</a></li>
    <li><a href="#about" className="hover:text-blue-400 transition-all">About</a></li>
    <li><a href="#contact" className="hover:underline">Contact</a></li>
  </ul>
</nav>

      </header>

      {/* Product Carousel Section */}
      <section id="products" className="py-16 px-4">
        <h2 className="text-3xl font-semibold text-center mb-8 text-blue-200">Explore Our Products</h2>
        <Swiper
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          onSlideChange={handleSlideChange}
          slidesPerView={3}
          spaceBetween={20}
          className="pb-8"
        >
          {productImages.map((product, index) => (
            <SwiperSlide key={index} className="flex flex-col items-center space-y-4">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={350}
                height={350}
                className="rounded-lg shadow-md border-2 border-gray-700"
              />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-lg text-gray-300">{product.price}</p>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            Buy Now
          </button>
        </div>
      </section>

      {/* Modal Section */}
      <BuyModal
        productName={activeProduct.name}
        productPrice={activeProduct.price}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Footer Section */}
      <footer className="p-6 bg-black text-center">
        <p className="text-sm text-gray-400">© 2024 Your Brand. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

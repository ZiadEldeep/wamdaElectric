// components/About.tsx
import React from "react";

const About: React.FC = () => {
  return (
    <section id="about" className="mb-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Story</h2>
      <p className="text-gray-600 mb-4">
        At wamda, we are committed to providing top-notch electrical services. Our journey began with a passion for innovation and a dedication to excellence in all we do.
      </p>
      <p className="text-gray-600 mb-4">
        Our team consists of highly skilled electricians who are experienced in various aspects of electrical work, ensuring that we can meet the diverse needs of our clients. Whether itis residential, commercial, or industrial projects, we have the expertise to handle it all.
      </p>
      <h3 className="text-2xl font-semibold text-gray-800 mt-4">Our Mission</h3>
      <p className="text-gray-600 mb-4">
        To deliver exceptional electrical services while prioritizing safety, quality, and customer satisfaction.
      </p>
      <h3 className="text-2xl font-semibold text-gray-800 mt-4">Why Choose Us?</h3>
      <ul className="list-disc list-inside text-gray-600 mb-4">
        <li>Experienced professionals with a commitment to quality.</li>
        <li>24/7 emergency services to address your urgent needs.</li>
        <li>Transparent pricing with no hidden fees.</li>
        <li>Customer satisfaction is our top priority.</li>
      </ul>
    </section>
  );
};

export default About;

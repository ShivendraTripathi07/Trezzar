import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src="https://c0.wallpaperflare.com/preview/389/615/630/business-businessman-communication-concept.jpg"
          alt="Trezzar Electronics"
          className="w-full h-full object-fill"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-center">
            About Trezzar
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <p className="text-xl font-semibold text-red-600">
              Welcome to Trezzar, your one-stop destination for high-quality
              electronics and gadgets.
            </p>

            <p>
              Whether you're looking for the latest mobile phones, sleek
              AirPods, powerful printers, or top-tier televisions, we've got
              something for every tech enthusiast. At Trezzar, we bring together
              a wide range of products from renowned brands, offering you the
              best in functionality, style, and innovation.
            </p>

            <p>
              Founded and developed by Shivendra Tripathi, a passionate
              full-stack developer, Trezzar is built with the vision of
              providing a seamless shopping experience. Our goal is to make
              technology accessible to everyone, with a website that's fast,
              easy to navigate, and designed to cater to all your tech needs.
            </p>

            <p>
              At Trezzar, we believe in delivering not just products, but value.
              Every item in our collection is carefully selected to ensure you
              get top-quality, performance-driven gadgets at competitive prices.
              Our commitment to customer satisfaction extends beyond just
              sales—we aim to provide you with a hassle-free online shopping
              experience, backed by excellent customer service and secure
              payments.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard
              title="Wide Selection"
              description="From smartphones to home appliances, find all your tech needs in one place."
            />
            <FeatureCard
              title="Quality Assured"
              description="We partner with renowned brands to bring you the best in technology."
            />
            <FeatureCard
              title="Expert Support"
              description="Our knowledgeable team is here to help you make informed decisions."
            />
            <FeatureCard
              title="Secure Shopping"
              description="Shop with confidence knowing your transactions are safe and protected."
            />
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Explore?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Discover why Trezzar is the perfect place for all your gadget
              needs.
            </p>
            <Link to={"/"} className="bg-red-600 text-white px-5 py-3 rounded-full font-semibold hover:bg-red-700 transition duration-300 flex items-center mx-auto w-40">
              Shop Now
              <ChevronRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default AboutUs;

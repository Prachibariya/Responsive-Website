import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <section className="relative h-96 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=600&fit=crop")'
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
          Food
        </h2>
        <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          Discover amazing deals on food
        </p>
        <Link 
          to="/products"
          className="inline-block bg-white text-purple-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105 animate-fade-in-up"
          style={{animationDelay: '0.4s'}}
        >
          Shop Now
        </Link>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse delay-300"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-700"></div>
    </section>
  );
};

export default Banner;

import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import ApiService from '../services/api';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
      <div className="relative">
        <Link to={`/product/${product._id}`}>
          <img
            src={ApiService.getImageUrl(product.img)}
            alt={product.alt || product.name}
            title={product.imgTitle || product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              // Fallback image if the API image fails to load
              e.target.src = 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=300&fit=crop';
            }}
          />
        </Link>
        
        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow-sm">
            <Heart className="h-4 w-4 text-gray-700 hover:text-red-500" />
          </button>
          <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow-sm">
            <ShoppingCart className="h-4 w-4 text-gray-700" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {/* Category */}
        <div className="mb-2">
          <span className="text-sm text-purple-600 font-medium">
            {product.categoryId?.name}
          </span>
        </div>
        
        {/* Product name */}
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-lg mb-2 text-gray-900 hover:text-purple-600 transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        
        {/* Description (truncated) */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description.length > 100 
            ? `${product.description.substring(0, 100)}...` 
            : product.description}
        </p>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-purple-600">₹{product.price}</span>
          </div>
        </div>
        
        {/* Add to cart button */}
        <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105 shadow-sm hover:shadow-md">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ArrowLeft, Check } from 'lucide-react';
import ApiService from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        setLoading(true);
        
        // Fetch product details
        const productResponse = await ApiService.getProductById(id);
        setProduct(productResponse.data);
        
        // Fetch related products from same category
        if (productResponse.data.categoryId) {
          const relatedResponse = await ApiService.getProductsByCategory(
            productResponse.data.categoryId._id, 
            { limit: 4 }
          );
          // Filter out current product
          const filtered = relatedResponse.data.filter(p => p._id !== id);
          setRelatedProducts(filtered);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndRelated();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {error || 'Product not found'}
        </h1>
        <Link to="/products" className="text-purple-600 hover:text-purple-700">
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li>
            <Link to="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li className="text-gray-900">{product.name}</li>
        </ol>
      </nav>

      <Link 
        to="/products" 
        className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div>
          <div className="mb-4">
            <img
              src={ApiService.getImageUrl(product.img)}
              alt={product.alt || product.name}
              title={product.imgTitle || product.name}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=300&fit=crop';
              }}
            />
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

          {/* Price */}
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-3xl font-bold text-purple-600">${product.price}</span>
          </div>

          {/* Category */}
          <div className="mb-6">
            <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              {product.categoryId.name}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Description:</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <div className="w-2 h-2 rounded-full mr-2 bg-green-500"></div>
              In Stock
            </span>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-gray-600 hover:text-gray-800"
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-gray-200">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-gray-600 hover:text-gray-800"
              >
                +
              </button>
            </div>

            <button className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </button>

            <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
            </button>
          </div>

          {/* Product Info */}
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Category:</span>
                <span className="text-gray-900">{product.categoryId.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Price:</span>
                <span className="text-gray-900">${product.price}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Added:</span>
                <span className="text-gray-900">
                  {new Date(product.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <Link
                key={relatedProduct._id}
                to={`/product/${relatedProduct._id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <img
                  src={ApiService.getImageUrl(relatedProduct.img)}
                  alt={relatedProduct.alt || relatedProduct.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=300&fit=crop';
                  }}
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                  <p className="text-purple-600 font-bold">${relatedProduct.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
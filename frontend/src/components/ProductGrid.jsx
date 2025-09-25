import React from 'react';
import ProductCard from './ProductCard';
import { Filter } from 'lucide-react';

const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mb-4">
          <Filter className="h-16 w-16 text-gray-300 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
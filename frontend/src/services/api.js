const API_BASE_URL = 'http://localhost:3000/api';

class ApiService {
  // Helper method for making requests
  async makeRequest(url, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Category API calls
  async getCategories() {
    return this.makeRequest('/categories');
  }

  async getCategoryById(id) {
    return this.makeRequest(`/categories/${id}`);
  }

  async createCategory(categoryData) {
    return this.makeRequest('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  }

  async updateCategory(id, categoryData) {
    return this.makeRequest(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    });
  }

  async deleteCategory(id) {
    return this.makeRequest(`/categories/${id}`, {
      method: 'DELETE',
    });
  }

  // Product API calls
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.makeRequest(`/products${queryString ? `?${queryString}` : ''}`);
  }

  async getProductById(id) {
    return this.makeRequest(`/products/${id}`);
  }

  async getProductsByCategory(categoryId, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.makeRequest(`/categories/${categoryId}/products${queryString ? `?${queryString}` : ''}`);
  }

  async createProduct(formData) {
    return fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      body: formData, // Don't set Content-Type for FormData
    }).then(response => {
      if (!response.ok) {
        return response.json().then(err => { throw new Error(err.message) });
      }
      return response.json();
    });
  }

  async updateProduct(id, formData) {
    return fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      body: formData,
    }).then(response => {
      if (!response.ok) {
        return response.json().then(err => { throw new Error(err.message) });
      }
      return response.json();
    });
  }

  async deleteProduct(id) {
    return this.makeRequest(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Image API calls
  async getImages() {
    return this.makeRequest('/images');
  }

  async getImageDetails(filename) {
    return this.makeRequest(`/images/details/${filename}`);
  }

  // Get image URL
  getImageUrl(imagePath) {
    if (imagePath.startsWith('/uploads/')) {
      return `http://localhost:3000${imagePath}`;
    }
    return imagePath;
  }
}

export default new ApiService();
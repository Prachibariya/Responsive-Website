require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const app = express(); // Create app BEFORE using middleware

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
});

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Category Schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
    img: {
    type: String,
    required: true,
    trim: true
  },
  imgTitle: {
    type: String,
    required: true,
    trim: true
  },
  alt: {
    type: String,
    required: true,
    trim: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
}, {
  timestamps: true
});

// Models
const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

// ============== CATEGORY ROUTES ==============

// GET all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    
    res.json({
      success: true,
      data: categories,
      count: categories.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
});

// GET single category by ID
app.get('/api/categories/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching category',
      error: error.message
    });
  }
});

// POST create new category
app.post('/api/categories', async (req, res) => {
  try {
    const { name, description } = req.body;
    
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name and description are required'
      });
    }

    const category = new Category({ name, description });
    await category.save();
    
    res.status(201).json({
      success: true,
      data: category,
      message: 'Category created successfully'
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: 'Category name already exists'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Error creating category',
        error: error.message
      });
    }
  }
});

// PUT update category
app.put('/api/categories/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name and description are required'
      });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      data: category,
      message: 'Category updated successfully'
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: 'Category name already exists'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Error updating category',
        error: error.message
      });
    }
  }
});

// DELETE category
app.delete('/api/categories/:id', async (req, res) => {
  try {
    // Check if category has products
    const productCount = await Product.countDocuments({ categoryId: req.params.id });
    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category. ${productCount} products are assigned to this category.`
      });
    }

    const category = await Category.findByIdAndDelete(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting category',
      error: error.message
    });
  }
});

// ============== PRODUCT ROUTES ==============

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 10 } = req.query;
    
    let filter = {};
    if (categoryId) filter.categoryId = categoryId;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find(filter)
      .populate('categoryId', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      data: products,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
});

// GET single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('categoryId', 'name description');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
});

// GET products by category
app.get('/api/categories/:categoryId/products', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find({ categoryId: req.params.categoryId })
      .populate('categoryId', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments({ categoryId: req.params.categoryId });

    res.json({
      success: true,
      data: products,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products by category',
      error: error.message
    });
  }
});

// ...existing code...

app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, categoryId, imgTitle, alt } = req.body;
    
    if (!name || !price || !description || !categoryId || !imgTitle || !alt) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required'
      });
    }

    // Validate category exists
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: 'Category not found'
      });
    }

    const product = new Product({
      name,
      price,
      description,
      categoryId,
      img: `/uploads/${req.file.filename}`, // Save the file path
      imgTitle,
      alt
    });
    
    await product.save();
    
    const populatedProduct = await Product.findById(product._id)
      .populate('categoryId', 'name');
    
    res.status(201).json({
      success: true,
      data: populatedProduct,
      message: 'Product created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }// ...existing code...

app.put('/api/products/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, categoryId, imgTitle, alt } = req.body;
    
    if (!name || !price || !description || !categoryId || !imgTitle || !alt) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate category exists
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: 'Category not found'
      });
    }

    const updateData = {
      name,
      price,
      description,
      categoryId,
      imgTitle,
      alt
    };

    // Only update image if a new file is uploaded
    if (req.file) {
      updateData.img = `/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('categoryId', 'name');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product,
      message: 'Product updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
});
});


// DELETE product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
});


// Add after your existing routes
// Add these routes after your existing routes

// GET all images
app.get('/api/images', async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, 'uploads');
    
    fs.readdir(uploadsDir, (err, files) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error reading uploads directory',
          error: err.message
        });
      }

      // Filter image files
      const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
      });

      // Create image URLs
      const images = imageFiles.map(filename => ({
        filename,
        url: `/uploads/${filename}`,
        fullUrl: `${req.protocol}://${req.get('host')}/uploads/${filename}`
      }));

      res.json({
        success: true,
        data: images,
        count: images.length
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching images',
      error: error.message
    });
  }
});

// GET image by filename - Returns actual image file
app.get('/api/images/view/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, 'uploads', filename);

    // Check if file exists
    if (!fs.existsSync(filepath)) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    // Set content type based on file extension
    const ext = path.extname(filename).toLowerCase();
    const contentTypes = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif'
    };
    
    res.setHeader('Content-Type', contentTypes[ext] || 'application/octet-stream');
    
    // Stream the image file
    const fileStream = fs.createReadStream(filepath);
    fileStream.pipe(res);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error streaming image',
      error: error.message
    });
  }
});

// GET image details by filename
app.get('/api/images/details/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, 'uploads', filename);

    if (!fs.existsSync(filepath)) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    const stats = fs.statSync(filepath);
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;

    res.json({
      success: true,
      data: {
        filename,
        url: `/uploads/${filename}`,
        fullUrl: fileUrl,
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching image details',
      error: error.message
    });
  }
});

// Start server
if (require.main === module) {
  app.listen(3000, () =>
    console.log("🚀 Server running at http://localhost:3000")
  );
}
const Product = require("../models/product");
const Vendor = require("../models/vendor");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

//Create new Product => /api/v1/admin/product/new

exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    //if user add one image then it will be a string not an array and if user add multiple images then it will be an array and push it to images array
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      //uploadinf images to cloudinary
      folder: "products",
    });

    imagesLinks.push({
      //after uploading we have to save links
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
 

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get all products => /api/v1/products
exports.getproducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 8; //Showing 8 result per page
  const productsCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), req.query)

    .search()
    .filter();

  let products = await apiFeatures.query.clone();
  let filteredProductCount = products.length;

  apiFeatures.pagination(resPerPage);

  products = await apiFeatures.query;
  res.status(200).json({
    success: true,

    productsCount,
    resPerPage,
    filteredProductCount,
    products,
  });
});

// Get all products(admin) => /api/v1/admin/products
exports.getAdminproducts = catchAsyncErrors(async (req, res, next) => {
  // const user = await Vendor.findById(req.vendor.id);
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// Get single product detail => /api/v1/product/:id

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  
  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product => /api/v1/admin/product/:id

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  let images = [];
  // if (typeof req.body.images === "string") {
  // images.push(req.body.images);
  // } else {
  images = req.body.images;
  // }

  if (images !== undefined) {
    // deleting images associated with products
    for await (let i of product.images) {
      const result = await cloudinary.v2.uploader.destroy(i.public_id);
    }

    let imagesLinks = [];
    for await (let i of images) {
      const result = await cloudinary.v2.uploader.upload(i, {
        folder: "products",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Delte Product => /api/v1/admin/product/:id

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  //deleting images assosiated with the product

  for (let i=0; i<product.images.length; i++)
  {
    const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "product is deleted",
  });
});


// Create new review   =>   /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

  const { rating, comment, productId } = req.body;
  

  //review object that i want to store in a database
  const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment
  }

  const product = await Product.findById(productId); //findind selected product in database

  const isReviewed = product.reviews.find(  //checking if user has already reviewed the product
      r => r.user.toString() === req.user._id.toString() //if any review matches with the current user that means user has already reviewed the product
  )

  if (isReviewed) {
  
      product.reviews.forEach(review => {
          if (review.user.toString() === req.user._id.toString()) {
              review.comment = comment;
              review.rating = rating;
          }
      })

  } else {
    
    
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length
  }

  product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
      success: true
  })

})

// Get Product Reviews   =>   /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})


const { Product, Reply } = require("../models/Product");

const newProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      subcategory,
      price,
      oprice,
      description,
      stockSize,
      image1,
      image2,
      image3,
      image4,
      image5,
      dose_form,
      pack_size,
    } = req.body;

    // Prepare product data with conditionally included fields
    const newProductData = {
      name,
      brand,
      category,
      price,
      oprice,
      description,
      stockSize,
      dose_form,
      pack_size,
      images: [image1, image2, image3, image4, image5].filter(Boolean),
    };

    // Conditionally add subcategory if it exists
    if (subcategory) {
      newProductData.subcategory = subcategory;
    }

    // Create new product with the filtered data
    const newProduct = new Product(newProductData);

    // Save the product to the database
    await newProduct.save();

    // Send success response
    res.status(201).json({
      message: "Product created successfully!",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const { brand, category } = req.query;
    let filter = {};
    if (brand) filter.brand = brand;

    if (category) filter.category = category;
    console.log(filter);

    const response = await Product.find(filter);
    console.log(response);
    if (response) {
      return res
        .status(200)
        .json({ message: "Product fetched Successfully", response });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const getSearchProducts = async (req, res) => {
  try {
    const { search } = req.query;
    console.log(search);
    if (!search || search.trim() === "") {
      return res.status(400).json({ message: "Search term is required" });
    }
    const pipeline = [
      {
        $search: {
          index: "default",
          text: {
            query: search,
            path: ["name", "brand", "category", "description"],
          },
        },
      },
    ];

    const response = await Product.aggregate(pipeline);
    console.log(response);
    if (response.length > 0) {
      return res.status(200).json({ message: "Product found", response });
    } else {
      return res.status(404).json({ message: "product Not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const getSingleProductDetails = async (req, res) => {
  try {
    const { productName } = req.params;
    console.log(productName);
    if (!productName)
      return res.status(400).json({ message: "product name is required" });

    const result = await Product.findOne({
      name: productName,
    });
    console.log(result);
    const relatedProducts = await Product.find({ category: result.category });
    if (result) {
      return res.status(200).json({
        message: "Product fetched Successfully",
        result,
        relatedProducts,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const handleaAddProductReview = async (req, res) => {
  try {
    const { rating, name, email, productId, comments, image } = req.body;

    if (!rating || !name || !email || !productId)
      return res
        .status(400)
        .json({ message: "Rating, Name, Email, and Product ID are required" });

    console.log(rating, name, email, productId);

    const product = await Product.findOne({ _id: productId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const newReview = {
      ratings: rating,
      name: name,
      email: email,
      comments: comments || "",
      Image: image || null,
    };

    product.reviews.push(newReview);

    await product.save();

    return res.status(200).json({
      message: "Review added successfully",
      review: newReview,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const handleReviewLike = async (req, res) => {
  try {
    const { reviewId, productId } = req.body;
    if (!reviewId || !productId)
      return res
        .status(400)
        .json({ message: "Product id and review id required" });

    const product = await Product.findOne({ _id: productId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const review = product.reviews.find((r) => r._id.toString() === reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    review.like += 1;

    await product.save();

    return res
      .status(200)
      .json({ message: "Successfully incremented the like count" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleReviewDislike = async (req, res) => {
  try {
    const { reviewId, productId } = req.body;
    if (!reviewId || !productId)
      return res
        .status(400)
        .json({ message: "Product id and review id required" });

    const product = await Product.findOne({ _id: productId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const review = product.reviews.find((r) => r._id.toString() === reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    review.dislike += 1;

    await product.save();

    return res
      .status(200)
      .json({ message: "Successfully incremented the dislike count" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  newProduct,
  getProducts,
  getSingleProductDetails,
  handleaAddProductReview,
  handleReviewLike,
  handleReviewDislike,
  getSearchProducts,
};

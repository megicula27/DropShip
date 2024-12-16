const mongoose = require("mongoose");

// Mongoose Schema
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
    },
    images: [
      {
        type: String,
        validate: {
          validator: function (v) {
            return /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(v);
          },
          message: "Invalid image URL",
        },
      },
    ],
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: [0, "Rating cannot be negative"],
        max: [5, "Rating cannot exceed 5"],
      },
      count: {
        type: Number,
        default: 0,
        min: [0, "Rating count cannot be negative"],
      },
    },
    variants: [
      {
        color: {
          type: String,
          trim: true,
        },
        size: {
          type: String,
          trim: true,
        },
        sku: {
          type: String,
          trim: true,
          unique: true,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create a virtual for discounted price (optional)
ProductSchema.virtual("discountedPrice").get(function () {
  // Example discount logic - you can customize this
  return this.price * 0.9; // 10% off
});

// Middleware to update updatedAt
ProductSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Create or retrieve the model
module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

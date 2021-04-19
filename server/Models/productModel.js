import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    isStateNew: { type: Boolean, required: true },
    images: { type: Array, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    numReviews: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    isOnSale: { type: Boolean, default: false },
    salePrice: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    description: { type: String, required: false },
    video: { type: String, required: false },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;

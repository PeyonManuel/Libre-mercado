import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    isStateNew: { type: Boolean, required: true },
    images: [{ type: String }],
    cover: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        rating: { type: Number, required: true },
      },
    ],
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: false },
    video: { type: String, required: false },
    noShipping: { type: Boolean, required: true },
    active: { type: Boolean, required: true, default: true },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    questions: [
      {
        whoAsked: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        question: { type: String, required: true },
        answer: { type: String, required: false },
        questionDate: { type: Date },
        answerDate: { type: Date },
      },
    ],
    finished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;

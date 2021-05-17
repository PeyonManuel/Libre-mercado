import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: false },
    surname: { type: String, required: true, unique: false },
    dni: { type: Number, required: true, unique: false },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
    },
    telephone: { type: String, required: false, unique: false },
    password: { type: String, required: true },
    productDrafts: [
      {
        name: { type: String, required: true, unique: false },
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category',
          required: true,
        },
        isStateNew: {
          type: Boolean,
          unique: false,
          default: null,
        },
        images: { type: Array, default: [] },
        stock: { type: Number, default: 0 },
        address: { type: mongoose.Schema.Types.ObjectId, default: null },
        price: { type: Number },
        noShipping: { type: Boolean, default: null },
        description: { type: String },
        video: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
    userData: {
      favorites: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: false,
        },
      ],
      notifications: [
        {
          text: { type: String },
          linkTo: { type: String },
          createdAt: { type: Date, default: Date.now },
        },
      ],
    },
    isAdmin: { type: Boolean, required: true, default: false },
    history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    ],
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
        saved: { type: Boolean, default: false },
      },
    ],
    updateHistory: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);
const User = mongoose.model('User', userSchema);

export default User;

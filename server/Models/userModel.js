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
    telephone: { type: String, required: false, unique: true },
    password: { type: String, required: true },
    addresses: [
      {
        postalCode: { type: String, required: true },
        street: { type: String, required: true },
        streetNumber: { type: String, required: false },
        additionalInformation: { type: String, required: false },
        betweenStreets: { type: String, required: false },
        reference: { type: String, required: false },
        province: { type: String, required: true },
        city: { type: String, required: true },
      },
    ],
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
        justShipping: { type: Boolean, default: null },
        description: { type: String },
        video: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
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
      notifications: { type: Array, required: false, unique: false },
    },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);
const User = mongoose.model('User', userSchema);

export default User;

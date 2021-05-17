import mongoose from 'mongoose';

const addressSchema = mongoose.Schema({
  lastUsed: { type: Boolean, default: false },
  postalCode: { type: String, required: true },
  street: { type: String, required: true },
  streetNumber: { type: String, required: false },
  additionalInformation: { type: String, required: false },
  betweenStreets: { type: String, required: false },
  reference: { type: String, required: false },
  province: { type: String, required: true },
  city: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Address = mongoose.model('Address', addressSchema);

export default Address;

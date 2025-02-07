import mongoose from "mongoose";
import { Schema } from "mongoose";

const orderSchema = new Schema({
  // User کی details کو embedded object کی صورت میں رکھا گیا ہے
  user: {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  // ادائیگی کا طریقہ (مثلاً "cash on delivery")
  paymentMethod: {
    type: String,
    required: true,
    trim: true,
  },

  products: {
    type: [],
    required: true,
  },

  totalOrderPrice: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export let Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

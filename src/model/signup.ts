import mongoose, { Schema } from "mongoose"

const signupSchema = new Schema({
  username: {
    type: String,
    required: true, 
    unique: true,   
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true, 
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },

  password: {
    type: String,
    required: false,
    minlength: 6   
  },

  // phoneNumber: {
  //   type: String,
  //   required: true,
  //   match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number.'] // Validates phone number format
  // },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const SignupUser = mongoose.models.Signup || mongoose.model('Signup', signupSchema);



import mongoose, { Schema } from "mongoose"

const adminSignupSchema = new Schema({
  

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


  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const AdminSignupUser = mongoose.models.Signup || mongoose.model('Signup', adminSignupSchema);



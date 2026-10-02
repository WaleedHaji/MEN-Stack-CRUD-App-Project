const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  userRole: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  location: {
    type: {
        type: String,
        enum: ['Point']
    },
    coordinates: {
        type: [Number]
    }
}
}, {timestamps: true});

userSchema.index({ location: '2dsphere' })

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      enum: ["user", "admin"],
      type: String,
      default: 'user',
    },

  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({ _id: this._id, role:this.role }, process.env.JWT_SECRET_KEY, {expiresIn: "15h"});
    return token;
}
module.exports = mongoose.model("User", UserSchema);

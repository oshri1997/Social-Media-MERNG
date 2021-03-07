import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

const userModel = mongoose.model("User", userSchema);
export default userModel;

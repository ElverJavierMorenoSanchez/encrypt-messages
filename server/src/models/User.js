import mongoose from "mongoose";

const User = new mongoose.Schema({
  username: { required: true, uniqued: true, type: String },
  name: String,
  email: String,
  secret: String,
});

export default mongoose.model("user", User);

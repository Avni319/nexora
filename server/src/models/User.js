import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    avatar: {
      type: String,
      default: "",
    },
    bio: {
  type: String,
  default: "",
  trim: true,
},

jobTitle: {
  type: String,
  default: "",
  trim: true,
},

github: {
  type: String,
  default: "",
  trim: true,
},

skills: {
  type: [String],
  default: [],
},
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
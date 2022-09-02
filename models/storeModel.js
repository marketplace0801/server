import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    shopname: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    description: {
        type: String,
        required: [true, "Please Enter description"],
        lowercase: true,
        maxLength: [100, "Name cannot exceed 30 characters"],
        minLength: [10, "Name should have more than 4 characters"],
    },
    location: {
        type: String,
        required: [true, "Please Enter location"],

    },
    category: {
        type: String,
        required: [true, "Please Enter Store Category"],
        lowercase: true,
    },


    avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      


    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export const Store = mongoose.model("Store",storeSchema)
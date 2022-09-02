import { Product } from "../models/productModel.js";
import { Store } from "../models/storeModel.js";
import { User } from "../models/userModel.js";
import cloudinary from "cloudinary";
import fs from "fs";

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const photo = req.files.photo.tempFilePath;

    const photoCloudinary = await cloudinary.v2.uploader.upload(photo, {
      folder: "productsphoto",
    });
    const store = await Store.findOne({ user: req.user });
    fs.rmSync(photo, { recursive: true });
    const product = await Product.create({
      photo: {
        public_id: photoCloudinary.public_id,
        url: photoCloudinary.url,
      },
      price: req.body.price,
      name: req.body.name,
      description: req.body.description,
      user: req.user,
      store,
    });

    res.status(201).json({
      product,
      success: true,
      message: "Shop created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

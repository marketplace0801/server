import { Store } from "../models/storeModel.js";
import cloudinary from "cloudinary";
import fs from "fs";
import { User } from "../models/userModel.js";
import { Product } from "../models/productModel.js";
//type : POST
//route : CreateStore
//auth : any user role account
export const createStore = async (req, res) => {
  try {
    const avatar = req.files.avatar.tempFilePath;
    console.log(avatar);
    let user = req.user;
    if (user.role == "owner") {
      return res
        .status(400)
        .json({
          success: false,
          message: "User already created store with this account",
        });
    }
    const storeCloudinary = await cloudinary.v2.uploader.upload(avatar, {
      folder: "storeprofilephoto",
    });

    fs.rmSync(avatar, { recursive: true });
    const store = await Store.create({
      avatar: {
        public_id: storeCloudinary.public_id,
        url: storeCloudinary.url,
      },
      category: req.body.category,
      shopname: req.body.shopname,
      description: req.body.description,
      location: req.body.location,
      user: req.user,
    });
    user = await User.findByIdAndUpdate(req.user, { role: "owner" });
    res.status(201).json({
      user,
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

//type : Get
//route : /getallshops
//auth : all account
export const getAllStores = async (req, res) => {
  try {
    const allstore = await Store.find();
    res.status(200).json({
      allstore,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//type : Get
//route : /storedashboard
//auth : /owner of shop
export const storedashboard = async (req, res) => {
  try {
    const dashboard = await Store.find({ user: req.user });
    const products = await Product.find({ user: req.user });
    res.status(200).json({
      products,
      dashboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

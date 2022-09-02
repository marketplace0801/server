import express from "express";
import { createProduct, getAllProduct } from "../controller/productController.js";
const router = express.Router();
import{ isAuthenticated }from '../middleware/auth.js'
router.route('/getallproducts').get(isAuthenticated, getAllProduct)
router.route('/createproduct').post(isAuthenticated, createProduct)
export default router
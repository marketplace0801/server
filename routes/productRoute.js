import express from "express";
import { createProduct, getAllProduct } from "../controller/productController.js";
const router = express.Router();
import{ isAuthenticated }from '../middleware/auth.js'
router.route('/getAllProducts').get(isAuthenticated, getAllProduct)
router.route('/createProduct').post(isAuthenticated, createProduct)
export default router
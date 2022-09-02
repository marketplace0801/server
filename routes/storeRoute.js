import express from "express";
import { createStore, getAllStores, storedashboard } from "../controller/storeController.js";
import { isAuthenticated } from "../middleware/auth.js";
const  router = express.Router();
router.route('/getallstores').get(isAuthenticated, getAllStores);
router.route('/createstore').post(isAuthenticated,createStore)
router.route('/storedashboard').get(isAuthenticated,storedashboard)
export default router;
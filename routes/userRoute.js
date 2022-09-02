import express from "express";
import { login, logout, Regitser } from "../controller/userController.js";
const  router = express.Router();

router.route('/register').post(Regitser)
router.route('/login').post(login)
router.route('/logout').get(logout)

export default router;
import {Router} from "express";
import multer from "multer";
import {AuthController} from "./auth.controller";

const router = Router()
const authController = new AuthController();
const upload = multer();

router.post('/login', upload.none(), (req, res) => authController.login(req, res))


export default router
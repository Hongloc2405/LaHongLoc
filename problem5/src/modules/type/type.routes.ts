import {Router} from "express";
import multer from "multer";
import {TypeController} from "./type.controller";

const router = Router()
const typeController = new TypeController()
const upload = multer();

router.get('/get-all-types',
    upload.none(),
    (req, res) => typeController.getAllTypes(req, res))

export default router
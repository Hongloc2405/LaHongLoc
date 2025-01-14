import {UserController} from "./user.controller";
import {Router} from "express";
import multer from "multer";
import authorizeMiddleware from "../../middlewares/authorize.middleware";

const router = Router()
const userController = new UserController();
const upload = multer();

router.post('/', upload.none(), (req, res) => userController.createUser(req, res))
router.get(
    '/get-user-permissions',
    authorizeMiddleware('CREATE_RESOURCE'),
    upload.none(),
    (req, res) => userController.getUserPermissions(req, res)
);


export default router
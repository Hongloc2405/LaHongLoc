import {Router} from "express";
import multer from "multer";
import authenticate from "../../middlewares/authenticate.middleware";
import {ResourceController} from "./resource.controller";

const router = Router()
const upload = multer();
const resourceController = new ResourceController()

router.post('/',
    authenticate,
    upload.none(),
    (req, res) => resourceController.createResource(req, res)
)

router.post('/filter-resources',
    authenticate,
    upload.none(),
    (req, res) => resourceController.filterResources(req, res))

router.get('/get-resource-details/:id',
    authenticate,
    upload.none(),
    (req, res) => resourceController.getResourceDetails(req, res))

router.put('/:id',
    authenticate,
    upload.none(),
    (req, res) => resourceController.updateResourceDetails(req, res)
)

router.delete('/:id',
    authenticate,
    upload.none(),
    (req, res) => resourceController.deleteResource(req, res))

export default router
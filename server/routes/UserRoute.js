import { Router } from "express";
import authJWT from "../helpers/authJWT";
import IndexController from "../controller/IndexController";

const router = Router();

router.get("/", IndexController.UserController.all);
router.post("/signin", authJWT.authenticate, authJWT.login);
router.post("/signup", IndexController.UserController.signup);
router.post('/',IndexController.UserController.create) 
router.put('/:id', IndexController.UserController.update) 
router.delete('/:id',IndexController.UserController.remove) 
//router.post("/refreshtoken",authJWT.refreshToken)

export default router;
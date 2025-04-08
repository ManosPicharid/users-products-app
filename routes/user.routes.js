import express from "express";
import * as userController from "../controllers/user.controller.js";
import { verifyToken, verifyRoles } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.get("/", verifyToken, userController.findAll);
router.get("/:username", userController.findOne);
router.post("/", verifyToken, verifyRoles("ADMIN"), userController.create);
router.patch("/:username", verifyToken, verifyRoles("ADMIN"), userController.update);
router.delete("/:username", verifyToken, verifyRoles("ADMIN"), userController.deleteByUsername);
router.delete("/:username/:email", verifyToken, verifyRoles("ADMIN"), userController.deleteByEmail);

export default router;
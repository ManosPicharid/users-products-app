import express from "express";
import * as userProductController from "../controllers/user.product.controller.js";

const router = express.Router();

router.get("/", userProductController.findAll);
router.get("/stats1", userProductController.stats1);
router.get("/:username", userProductController.findOne);
router.post("/", userProductController.create);
router.patch("/:username", userProductController.update);
router.delete("/:username/products/:id", userProductController.deleteProduct);

export default router;
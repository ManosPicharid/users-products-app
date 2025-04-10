import express from "express"
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/login', authController.login);
router.get('/google/callback', authController.googleLogin);

export default router;

// https://accounts.google.com/o/oauth2/auth?client_id=691767093143-4vltvh5kl6lhf0p2msod2pd7hmogt1tu.apps.googleusercontent.com&redirect_uri=http://localhost:3000/api/auth/google/callback&response_type=code&scope=email%20profile&access_type=offline
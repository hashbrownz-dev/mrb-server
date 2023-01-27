import { Router } from "express";
import { registerUser, loginUser, showUserRecipes } from "../api/user.js";
import verifyToken from "../middleware/authJWT.js";

const router = Router();

// Register (CREATE)
router.post('/register', registerUser);

// SIGN IN ()
router.post('/login', loginUser);

// SHOW RECIPES
router.get('/recipes', verifyToken, showUserRecipes);

// SHOW COMMENTS

export default router;
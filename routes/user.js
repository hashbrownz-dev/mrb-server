import { Router } from "express";
import { registerUser, loginUser } from "../api/user.js";

const router = Router();

// Register (CREATE)
router.post('/register', registerUser);

// SIGN IN ()
router.post('/login', loginUser);

// SHOW
// router.get('/:id', showUser);

export default router;
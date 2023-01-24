import { Router } from "express";
import { createUser } from "../api/user.js";

const router = Router();

// CREATE
router.post('/', createUser);

export default router;
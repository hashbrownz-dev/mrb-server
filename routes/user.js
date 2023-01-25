import { Router } from "express";
import { createUser, showUser, editUser } from "../api/user.js";

const router = Router();

// CREATE
router.post('/', createUser);

// EDIT
router.get('/:id/edit', editUser);

// SHOW
router.get('/:id', showUser);

export default router;
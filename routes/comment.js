import { Router } from "express";
import { createComment, deleteComment, showComment, updateComment } from "../api/comment.js";

const router = Router();

// INDEX
// NEW
// DELETE
router.delete('/:id', deleteComment); 
// UPDATE
// Create
router.post('/:id', createComment);
// EDIT
router.put('/:id', updateComment);
// SHOW
router.get('/:id', showComment);

export default router;
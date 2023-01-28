import { Router } from "express";
import { createComment, deleteComment, getAllRecipeComments, getAllUserComments, getComment, updateComment } from "../api/comment.js";

const router = Router();

// INDEX Get ALL Comments from User
router.get('/user-comments/:id', getAllUserComments);

// Get ALL Comments from Recipe
router.get('/recipe-comments/:id', getAllRecipeComments);
// NEW
// DELETE
router.delete('/:id', deleteComment); 
// UPDATE
// Create
router.post('/:id', createComment);
// EDIT
router.put('/:id', updateComment);
// SHOW
router.get('/:id', getComment);

export default router;
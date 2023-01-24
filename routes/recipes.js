import { Router } from "express";
import { getRecipes, deleteRecipe, newRecipe, updateRecipe, createRecipe, editRecipe, showRecipe } from "../api/recipes.js";

const router = Router();

// INDUCES
router.get('/', getRecipes);
router.get('/new',newRecipe );
router.delete('/:id', deleteRecipe);
router.put('/:id', updateRecipe);
router.post('/', createRecipe);
router.get('/edit/:id', editRecipe);
router.get('/:id', showRecipe);

export default router;
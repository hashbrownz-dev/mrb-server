import { Router } from "express";
import { getRecipes, getAllUserRecipes, deleteRecipe, newRecipe, updateRecipe, createRecipe, editRecipe, showRecipe } from "../api/recipes.js";

const router = Router();

// INDUCES
router.get('/', getRecipes);
router.get('/my-recipes/:user', getAllUserRecipes);
// router.get('/new',newRecipe );
router.delete('/', deleteRecipe);
router.put('/', updateRecipe);
router.post('/', createRecipe);
router.get('/edit/:id', editRecipe);
router.get('/:id', showRecipe);

export default router;
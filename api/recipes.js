import mongoose from "mongoose";
import { Recipe } from "../models/recipe.js";
import { User } from "../models/user.js";

// INDEX
export const getRecipes = async (req, res) => {
    const recipes = await Recipe.find({});
    res.status(201).json(recipes);
}

export const getAllUserRecipes = async (req, res) => {
    try {
        const { user } = req.params;
        const recipes = await Recipe.find({'author':user});
        res.status(201).json(recipes);
    } catch (error) {
        console.error(error);
    }
}

// NEW
export const newRecipe = (req, res) => {
    res.send(`Create New Recipe`)
}

// DELETE
export const deleteRecipe = async (req, res) => {
    const { user, accessToken, recipeId } = req.body;
    try{
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
        // Update our user
        // const user = await User.findById(deletedRecipe._id);
        res.json(deletedRecipe);
    }catch(e){
        console.error(e);
    }
}

// UPDATE
export const updateRecipe = async (req, res) => {
    const { title, ingredients, directions, user, accessToken, recipeId } = req.body;
    console.log(req.body);
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId,{ title, ingredients, directions });
        res.json(updatedRecipe); // The update works, but updatedRecipe is actually the OLD recipe
    }catch(e){
        console.error(e)
    }
}

// CREATE
export const createRecipe = async (req, res) => {
    // in order for createRecipe to EVEN work, we'd need a user to be logged in.  I'm not sure where we'll get the user id from.  BUT for now, let's use a test constant.
    const { title, ingredients, directions, user, accessToken } = req.body;
    try{
        // create Recipe
        const createdRecipe = new Recipe( { title, author:user._id, ingredients, directions });
        // attach recipe to User
        const userDoc = await User.findById(user._id);
        userDoc.recipes.push(createdRecipe._id);
        await userDoc.save();
        await createdRecipe.save();
        res.status(201).json(createdRecipe);
    }catch(e){
        console.error(e);
    }
}

// EDIT
export const editRecipe = (req, res) => {
    res.send(`Edit a Recipe`)
}

// SHOW
export const showRecipe = async (req, res) => {
    // Get the Recipe based on it's id
    const { id } = req.params;
    try {
        const recipe = await Recipe.findById(id).populate('author').populate('author').populate('comments');
        res.json(recipe);
    }catch(e){
        console.error(e);        
    }
}
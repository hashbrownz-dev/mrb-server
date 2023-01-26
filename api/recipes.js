import mongoose from "mongoose";
import { Recipe } from "../models/recipe.js";
import { User } from "../models/user.js";

// TESTING
const userID = '63d158addeb0f9296f68c105';
const testRecipe = {
    title:'test recipe',
    ingredients: ['test ingredient one', 'test ingredient two'],
    directions: ['test direction one', 'test direction two']
}
const testUpdateRecipe = {
    title:'New Title',
    ingredients: ['new ingredient one', 'new ingredient two'],
    directions: ['new direction one', 'new direction two'],
}

// INDEX
export const getRecipes = (req, res) => {
    res.send(`View Recipes`);
}

// NEW
export const newRecipe = (req, res) => {
    res.send(`Create New Recipe`)
}

// DELETE
export const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    try{
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        // Update our user
        const user = await User.findById(deletedRecipe._id);
        res.json(deletedRecipe);
    }catch(e){
        console.error(e);
    }
}

// UPDATE
export const updateRecipe = async (req, res) => {
    const { title, ingredients, directions } = testUpdateRecipe;
    const { id } = req.params;
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(id,{ title, ingredients, directions });
        res.json(updatedRecipe); // The update works, but updatedRecipe is actually the OLD recipe
    }catch(e){
        console.error(e)
    }
}

// CREATE
export const createRecipe = async (req, res) => {
    // in order for createRecipe to EVEN work, we'd need a user to be logged in.  I'm not sure where we'll get the user id from.  BUT for now, let's use a test constant.
    const { title, ingredients, directions } = testRecipe;
    try{
        // get User data
        const user = await User.findById(userID);
        // create Recipe
        const createdRecipe = new Recipe( { title, author:user._id, ingredients, directions });
        // attach recipe to User
        user.recipes.push(createdRecipe._id);
        await user.save();
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
        const recipe = await Recipe.findById(id).populate('author');
        res.json(recipe);
    }catch(e){
        console.error(e);        
    }
}
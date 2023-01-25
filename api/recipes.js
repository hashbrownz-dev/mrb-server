import mongoose from "mongoose";
import { Recipe } from "../models/recipe.js";
import { User } from "../models/user.js";

// INDEX
export const getRecipes = (req, res) => {
    res.send(`View Recipes`);
}

// NEW
export const newRecipe = (req, res) => {
    res.send(`Create New Recipe`)
}

// DELETE
export const deleteRecipe = (req, res) => {
    res.send(`Delete a Recipe`)
}

// UPDATE
export const updateRecipe = (req, res) => {
    res.send(`Update a Recipe`)
}

// CREATE
export const createRecipe = async (req, res) => {
    const testRecipe = {
        title:'test recipe',
        ingredients: ['test ingredient one', 'test ingredient two'],
        directions: ['test direction one', 'test direction two']
    }
    const { title, ingredients, directions } = testRecipe;

    // const { title, ingredients, directions } = req.body;
    // const createdRecipe = new Recipe( { title, author, ingredients, directions });
    
    try{
        // get User data
        const user = await User.findById("63d032427dd044ba2c50ffa7")
        // create Recipe
        const createdRecipe = new Recipe( { title, author:user._id, ingredients, directions });
        // attach recipe to User
        const updatedRecipes = user.recipes;
        updatedRecipes.push(createdRecipe._id);
        await user.updateOne({ recipes : updatedRecipes });
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
export const showRecipe = (req, res) => {
    res.send(`Show Route for Recipe`)
}
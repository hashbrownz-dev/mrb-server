import mongoose from "mongoose";
import User from "../models/user.js";
import Recipe from "../models/recipe.js";
import Comment from "../models/comment.js";

// INDEX
// NEW
// DELETE
export const deleteComment = async ( req, res ) => {
    const { id } = req.params;
    try{
        const comment = await Comment.findById(id);
        const user = await User.findById(comment.author);
        const recipe = await Recipe.findById(comment.recipe);
        // await Comment.findByIdAndDelete(id);
        res.json(comment);
    }catch(e){
        console.error(e);
    }
}
// UPDATE
export const updateComment = async ( req, res ) => {
    const { message } = req.body;
    const { id } = req.params;
    try{
        await Comment.findByIdAndUpdate(id, {message});
        res.json(message);
    }catch(e){
        console.error(e);
    }
}

// CREATE
export const createComment = async (req, res) => {
    const { message } = req.body;    
    try{
        const user = await User.findById("63d032427dd044ba2c50ffa7");
        const recipe = await Recipe.findById("63d035d6f2794422aa4c33ad");
        const createdComment = new Comment({ message, author: user._id, recipe: recipe._id });
        // Associate the Comment with a recipe
        const recipeComments = recipe.comments;
        recipeComments.push(createdComment._id);
        // Associate the Comment with a user
        const userComments = user.comments;
        userComments.push(createdComment._id);
        // Save the Comment to the Database
        await recipe.updateOne({ comments : recipeComments });
        await user.updateOne({ comments: userComments });
        await createdComment.save();
        res.status(201).json(createdComment);
    }catch(e){
        console.error(e);
    }
}

// EDIT


// SHOW
export const showComment = async ( req, res ) => {
    const { id } = req.params;
    try{
        const comment = await Comment.findById(id);
        res.json(comment);
    }catch(e){
        console.error(e);
    }
}
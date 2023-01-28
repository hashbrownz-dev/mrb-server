import mongoose, { Mongoose } from "mongoose";
import { User } from "../models/user.js";
import { Recipe } from "../models/recipe.js";
import { Comment } from "../models/comment.js";

// TESTING
const userID = '63d158addeb0f9296f68c105';

// CREATE
export const createComment = async (req, res) => {
    const { message } = req.body;
    const { id:recipeId } = req.params;  
    try{
        const user = await User.findById(userID);
        const recipe = await Recipe.findById(recipeId);
        const createdComment = new Comment({ message, author : user._id, recipe : recipe._id});
        user.comments.push(createdComment._id);
        recipe.comments.push(createdComment._id);
        await user.save();
        await createdComment.save();
        res.status(201).json(createdComment);
    }catch(e){
        console.error(e);
    }
}

// READ
export const getComment = async ( req, res ) => {
    const { id } = req.params;
    try{
        const comment = await Comment.findById(id).populate('author').populate('recipe');
        res.json(comment);
    }catch(e){
        console.error(e);
    }
}

export const getAllUserComments = async ( req, res ) => {
    const userComments = [];
    try {
        const user = await User.findById(req.params.id);
        for( const commentId of user.comments ){
            const comment = await Comment.findById(commentId).populate('author').populate('recipe');
            userComments.push(comment);
        }
        res.status(201).json(userComments);
    } catch(e) {
        console.error(e);
    }
}

export const getAllRecipeComments = async ( req, res ) => {
    const recipeComments = [];
    try {
        const recipe = await Recipe.findById(req.params.id);
        for( const commentId of recipe.comments){
            const comment = await Comment.findById(commentId).populate('author').populate('recipe');
            recipeComments.push(comment)
        }
        res.status(201).json(recipeComments);
    } catch(e) {
        console.error(e);
    }
}

// UPDATE
export const updateComment = async ( req, res ) => {
    const { message } = req.body;
    const { id } = req.params;
    try{
        const updatedMessage = await Comment.findByIdAndUpdate(id, {message});
        res.json(updatedMessage);
    }catch(e){
        console.error(e);
    }
}

// DELETE
export const deleteComment = async ( req, res ) => {
    const { id } = req.params;
    try{
        const deletedComment = await Comment.findByIdAndDelete(id);
        res.json(deletedComment);
    }catch(e){
        console.error(e);
    }
}
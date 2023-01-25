import mongoose, { Schema } from "mongoose";

// CREATE A SCHEMA
// title, author, ingredients, directions, likes, comments, image, createdAt, lastModified

export const recipeSchema = new mongoose.Schema({
    title: String,
    ingredients: [String],
    directions: [String],
    likes : { type: Number, default: 0 },
    author: { type : Schema.Types.ObjectId, ref : 'user' },
    comments : [ { type : Schema.Types.ObjectId, ref : 'comment' } ],
    image : Buffer
}, {timestamps : true} )

// CREATE A MODEL

export const Recipe = mongoose.model('recipe', recipeSchema);
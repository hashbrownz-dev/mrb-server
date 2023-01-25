import { Schema, model } from 'mongoose';
import { recipeSchema } from './recipe.js';
import { commentSchema } from './comment.js';

export const userSchema = new Schema({
    name:String,
    email:String,
    password:String,
    createdAt: { type: Date, default: Date.now() },
    comments: [ { type : Schema.Types.ObjectId, ref : 'comment' } ],
    recipes: [ { type : Schema.Types.ObjectId, ref : 'recipe' } ]
});

export const User = model('user', userSchema);
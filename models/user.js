import { Schema, model } from 'mongoose'
import Recipe from './recipe.js';

const userSchema = new Schema({
    name:String,
    email:String,
    password:String,
    createdAt: { type: Date, default: Date.now() },
    comments: [ String ],
    recipes: [ String ]
});

const User = model('user', userSchema);

export default User;
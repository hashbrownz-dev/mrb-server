import { Schema, model } from 'mongoose';
import { recipeSchema } from './recipe.js';
import { commentSchema } from './comment.js';
import isEmail from 'validator/lib/isEmail.js';

export const userSchema = new Schema({
    name : String,
    email : {
        type : String,
        required : [ true, 'A valid e-mail address is required.'],
        validate : {
            validator : isEmail,
            message : props => `${props.value} is not a valid E-mail.`
        }
    },
    password : {
        type : String,
        required : [ true, 'Password is required'],
    },
    createdAt : { type: Date, default: Date.now() },
    comments : [ { type : Schema.Types.ObjectId, ref : 'comment' } ],
    recipes : [ { type : Schema.Types.ObjectId, ref : 'recipe' } ]
});

export const User = model('user', userSchema);
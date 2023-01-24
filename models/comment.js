import { Schema, model, isObjectIdOrHexString } from 'mongoose';
import User from '../models/user.js';

const commentSchema = new Schema({
    message: String,
    author: String,
    recipe: String,
}, {timestamps : true})

const Comment = model('comment', commentSchema);

export default Comment;
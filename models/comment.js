import { Schema, model, isObjectIdOrHexString } from 'mongoose';

export const commentSchema = new Schema({
    message: String,
    recipe: String,
    author: { type : Schema.Types.ObjectId, ref : 'user' },
}, {timestamps : true})

export const Comment = model('comment', commentSchema);
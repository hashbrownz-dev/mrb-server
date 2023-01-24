import mongoose from "mongoose";

// CREATE A SCHEMA
// title, author, ingredients, directions, likes, comments, image, createdAt, lastModified

const recipeSchema = new mongoose.Schema({
    title: String,
    author: String,
    ingredients: [String],
    directions: [String],
    likes : { type: Number, default: 0 },
    comments : [ String ],
    image : Buffer
}, {timestamps : true} )

// CREATE A MODEL

const Recipe = mongoose.model('recipe', recipeSchema);

export default Recipe;
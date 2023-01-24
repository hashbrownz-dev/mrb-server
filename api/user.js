import mongoose from "mongoose";
import User from "../models/user.js";

// INDEX
// NEW
// DELETE
// UPDATE
// CREATE
export const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const createdUser = new User( { name, email, password } );
    try{
        await createdUser.save();
        res.status(201).json(createdUser);
    }catch(e){
        console.error(e);
    }
}
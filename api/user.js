import mongoose from "mongoose";
import { User } from "../models/user.js";

// INDEX
// NEW
// DELETE
// UPDATE
export const updateUser = async (req, res) => {
    // Parse Incoming Data
    // Get and update user
    // return json?
}

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

// EDIT
export const editUser = async (req, res) => {
    const { id } = req.params;
    try{
        const user = await User.findById(id);
        res.json(user);
    }catch(e){
        console.error(e);
    }
}

// SHOW
export const showUser = async (req, res) => {
    const { id } = req.params;
    try{
        const user = await User.findById(id);
        res.json(user);
    }catch(e){
        console.error(e);
    }
}
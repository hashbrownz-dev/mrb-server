import mongoose from "mongoose";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";

// CREATE
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    // const createdUser = new User( { name, email, password } );
    try{
        // Check if e-mail is already in use
        let userExists = await User.findOne({email});
        if(userExists){
            res.status(401).json({ message : 'E-mail address is already in use.' });
            return;
        }

        // Encrypt password
        bcrypt.hash(password, 10, (err, hash) => {
            if(err) throw new Error("Internal Server Error");

            // Create a new User
            User.create({name, email, password : hash})
                .then( (user) => {
                    res.status(200).json(user);
                })
                .catch( (error) => {
                    res.status(401).json(error.message)
                })
        })
    }catch(e){
        console.error(e);
    }
}

// LOG IN

export const loginUser = async (req, res) => {
    // This will be a post request... and within our body their should be an email and password
    const { email, password } = req.body;
    try {
        // Check if the user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"The e-mail address or password is invalid"});
        }
        // Compare passwords
        bcrypt.compare(password, user.password, (err, result) => {
            if(err){
                return res.json(err);
            }
            if(!result){
                return res.status(401).json({message:"The e-mail address or password is invalid"})
            }
            // Return a valid JWT to the client.
            // Save this JWT to localStorage.
            return res.status(200).json({result});
        })
    } catch(e) {
        res.status(401).json(e.message);
    }
}
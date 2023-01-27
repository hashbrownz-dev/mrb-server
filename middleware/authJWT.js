import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import asyncHandler from 'express-async-handler'

const verifyToken = asyncHandler( async (req, res, next) => {
    let token;
    console.log('hello?')

    if ( req.headers.authorization && req.headers.authorization.startsWith('JWT') ){
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.API_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id)
            next();
        }catch(e){
            res.status(401);
            throw new Error('Not authorized');
        }       
    }

    if(!token){
        res.status(401);
        throw new Error('Not authorized, no access token');
    }
})

export default verifyToken
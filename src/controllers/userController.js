import express from 'express';
import  User from '../models/user.js';

const userController = express.Router();
//get  all users
router.get('/', async(req,res)=>{
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})

// get one user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default userController;



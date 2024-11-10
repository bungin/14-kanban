import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router();


export const login = async (req: Request, res: Response) => {
  // DO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ where: { username } });
    
    if (!user) {
      return res.status(404).json({ message: 'no user' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    console.log('valid pass?',validPassword)
    
    if (!validPassword) {
      console.log("User or pass invalid");
      return res.status(404).json({ message: 'bad pass' });
    }
    
    const secretKey = process.env.JWT_SECRET_KEY || "";
    const token = jwt.sign({ username }, secretKey, { expiresIn: '2h' });
    
    console.log("User logged in: ", username);
    console.log("Token: ", token);
    return res.json({ token });
  } catch (err) {
    console.log("User login error: ", err);
    return res.status(500).json({ message: 'Server Error', err });
  }
};
  
  
  // POST /login - Login a user
  router.post('/login', login);
  
  export default router;
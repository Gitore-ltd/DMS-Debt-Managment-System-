import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { User } from '../database/models';
import generateToken from '../helper/tokenGenerator';

dotenv.config();

class userController {
  static async signup(req, res) {
    try {
      const { email, password, confirmPassword } = req.body;
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser !== null) return res.status(409).json({ error: 'Email has already taken.' });
      if (password !== confirmPassword) {
        return res
          .status(500)
          .json({ error: 'Password does not match, please try again!' });
      }
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newData = { email, password: hashedPassword };
      const token = generateToken({
        email,
      });
      const newUser = await User.create(newData);
      return res.status(201).json({
        status: 200,
        jwtoken: token,
        message: 'new user successfuly registered',
        data: newUser,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export default userController;

import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { User } from '../database/models';
import userSchema from '../helper/loginValidation';
import generateToken from '../helper/tokenGenerator';

dotenv.config();

class userController {
  static async signup(req, res) {
    try {
      const { email, password, confirmPassword } = req.body;
      const user = userSchema.validate({ email, password });

      if (user.error) {
        return res
          .status(400)
          .json({ status: 400, error: user.error.details[0].message });
      }
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser !== null) return res.status(409).json({ error: 'Email is already taken!' });
      if (password !== confirmPassword) {
        return res
          .status(500)
          .json({ error: 'Password does not match, please try again!' });
      }
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newData = { email, password: hashedPassword, role: 'customer' };
      const token = generateToken({
        email,
      });
      const newUser = await User.create(newData);
      return res.status(201).json({
        status: 201,
        message: 'new user successfuly registered',
        jwtoken: token,
        data: newUser,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, Error: error });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = userSchema.validate({ email, password });
      if (user.error) {
        return res
          .status(400)
          .json({ status: 400, error: user.error.details[0].message });
      }
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser == null) {
        return res
          .status(404)
          .json({ status: 400, error: 'Email or password is incorrect' });
      }
      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password,
      );
      if (passwordMatch === false) {
        return res
          .status(400)
          .json({ status: 400, error: 'Email or password is incorrect' });
      }
      const token = generateToken({ email });
      return res.status(200).json({
        status: 200,
        message: 'user successfuly registered',
        jwtoken: token,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, Error: error.message });
    }
  }
}

export default userController;

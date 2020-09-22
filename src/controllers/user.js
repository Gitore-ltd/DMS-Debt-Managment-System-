import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { User } from '../database/models';
import userSchema from '../helper/loginValidation';
import generateToken from '../helper/tokenGenerator';
import models from '../database/models';
import generatePswd from '../utils/randomPswd';
import localStorage from 'localStorage';

dotenv.config();

class userController {
  static async signup(req, res) {
    try {
      const { email, password, confirmPassword } = req.body;
      const user = userSchema.validate({ email, password });
      const role = 'customer';

      if (user.error) {
        return res.status(400).json({ status: 400, error: user.error.details[0].message });
      }
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser !== null) return res.status(409).json({ error: 'Email is already taken!' });
      if (password !== confirmPassword) {
        return res.status(500).json({ error: 'Password does not match, please try again!' });
      }
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newData = { email, password: hashedPassword, role };
      const token = generateToken({
        email,
        role,
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
        return res.status(400).json({ status: 400, error: user.error.details[0].message });
      }
      const existingUser = await User.findOne({ where: { email } });
      const { firstName, lastName, dateOfBirth, telephone, nationalId, role, address } = existingUser;

      if (existingUser == null) {
        return res.status(404).json({ status: 400, error: 'Email or password is incorrect' });
      }
      const passwordMatch = await bcrypt.compare(password, existingUser.password);
      if (passwordMatch === false) {
        return res.status(400).json({ status: 400, error: 'Email or password is incorrect' });
      }
      const token = generateToken({
        email,
        firstName,
        lastName,
        dateOfBirth,
        telephone,
        nationalId,
        role,
        address,
      });

      return res.status(200).json({
        status: 200,
        message: 'user successfuly registered',
        jwtoken: token,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, Error: error.message });
    }
  }

  static async socialLogin(req, res) {
    try {
      const { User } = models;
      const profile = { ...req.user };
      const firstName = profile.name.firstName || profile.name.givenName;
      const lastName = profile.name.lastName || profile.name.familyName;
      const email = profile.emails ? profile.emails[0].value : null;
      const profileImage = profile.photos ? profile.photos[0].value : null;
      const role = 'customer';
      const password = generatePswd();
      const existingUser = await User.findOne({ where: { email } });
      const token = generateToken({
        email,
        role,
      });
      if (existingUser !== null) {
        return res.redirect(`${process.env.FRONT_END_URL}/social-login?token=${token}`);
      }
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newData = { firstName, lastName, email, profileImage, role, password: hashedPassword };
      const newUser = await User.create(newData);
      return res.redirect(`${process.env.FRONT_END_URL}/social-login?token=${token}`);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async logout(req, res) {
    try {
      localStorage.removeItem('user-token');
      return res.status(200).json({ status: 200, message: 'Logout successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default userController;

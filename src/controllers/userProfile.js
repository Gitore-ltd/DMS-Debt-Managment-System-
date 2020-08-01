import dotenv from 'dotenv';
import { User } from '../database/models';
import profileValidation from '../helper/profileValidation';

dotenv.config();

export default class userProfile {
  static async getProfile(req, res) {
    try {
      const userInfo = await User.findOne({ where: { email: req.user.email } });
      return res.status(200).json({ status: 200, user: userInfo });
    } catch (error) {
      return res.status(500).json({ status: 500, Error: error.message });
    }
  }

  static async updateProfile(req, res) {
    try {
      const {
        firstName,
        lastName,
        dateOfBirth,
        telephone,
        nationalId,
      } = req.body;

      const user = profileValidation.validate({
        email: req.user.email,
        firstName,
        lastName,
        dateOfBirth,
        telephone,
        nationalId,
      });

      if (user.error) {
        return res
          .status(400)
          .json({ status: 400, error: user.error.details[0].message });
      }
      User.update(req.body, { where: { email: req.user.email } })

        .then(() => User.findOne({ where: { email: req.user.email } }))
        .then((user) => {
          res.status(200).json({ status: 200, user });
        });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        Error: error.message,
      });
    }
  }
}

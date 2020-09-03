import dotenv from 'dotenv';
import multer from 'multer';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
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
      cloudinary.v2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });

      let imageLink = null;

      if (req.files) {
        const file = req.files.profileImage;
        imageLink = await cloudinary.uploader.upload(file.tempFilePath);
      }

      const {
        firstName,
        lastName,
        dateOfBirth,
        telephone,
        nationalId,
        role,
        address,
      } = req.body;

      let { profileImage } = req.body;
      profileImage = imageLink ? imageLink.url : 'no image found';

      const user = profileValidation.validate({
        email: req.user.email,
        firstName,
        lastName,
        dateOfBirth,
        telephone,
        nationalId,
        profileImage,
        role,
        address,
      });
      if (user.error) {
        return res
          .status(400)
          .json({ status: 400, error: user.error.details[0].message });
      }
      User.update(user.value, { where: { email: req.user.email } })

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

  static async findUser(req, res) {
    try {
      const foundUser = await User.findOne({
        where: { email: req.headers.email },
      });

      const userInfo = foundUser ? foundUser.dataValues : '';

      if (userInfo.length) {
        return res.status(404).json({
          status: 404,
          message: 'no user found',
        });
      }
      return res.status(200).json({
        status: 200,
        userInfo,
      });
    } catch (error) {
      return res.status(500).json({
        Error: error.message,
      });
    }
  }

  static async findAllUser(req, res) {
    try {
      const findAllUsers = await User.findAll({
        attributes: ['firstName', 'lastName', 'email', 'telephone', 'nationalId', 'profileImage', 'address', 'dateOfBirth', 'role'],
      });

      if (findAllUsers.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'no user found',
        });
      }
      return res.status(200).json({
        status: 200,
        findAllUsers,
      });
    } catch (error) {
      return res.status(500).json({
        Error: error.message,
      });
    }
  }
}

import dotenv from 'dotenv';

dotenv.config();

class userController {
  static signup(req, res) {
    const { email, password } = req.body;

    return res.status(201).json({
      status: 201,
      message: `email: ${email}`,
    });
  }
}

export default userController;

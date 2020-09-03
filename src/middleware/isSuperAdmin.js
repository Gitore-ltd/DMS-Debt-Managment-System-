import { User } from '../database/models';

const isSuperAdmin = async (req, res, next) => {
  const userInfo = await User.findOne({ where: { email: req.user.email } });
  if (userInfo.dataValues.role !== 'superAdmin') {
    return res.status(401).json({
      status: 401,
      error: 'Not allowed to access this page',
    });
  }
  next();
};

export default isSuperAdmin;

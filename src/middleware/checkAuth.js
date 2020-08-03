import decodeToken from '../helper/decodToken';

const auth = (req, res, next) => {
  const token = req.header('token');
  if (!token) {
    return res.status(401).json({
      status: 401,
      error: 'you are not logged in',
    });
  }
  try {
    const decoded = decodeToken(token, process.env.SECRETKEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
  return token;
};
export default {
  auth,
};

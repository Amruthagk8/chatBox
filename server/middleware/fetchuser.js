const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';

const fetchuser = async (req, res, next) => {
  const token = req.header('token');
  if (!token) {
    return res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (err) {
    res.status(401).send({ errors: "Invalid token" });
  }
};

module.exports = fetchuser;

const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({userId:newUser._id, msg: 'User registered successfully', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: 'User does not exist' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Password or Username is incorrect' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ msg: 'Login successful', token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const setAvatar = async (req, res) => {
  try {
    console.log("start")
    const userId = req.params.id;
    const { image } = req.body;
    console.log("userid,image",userId,req.body)

    const user = await User.findByIdAndUpdate(userId, { avatarImage: image, isAvatarImageSet: true }, { new: true });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ msg: 'Avatar set successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { registerUser, loginUser, setAvatar };

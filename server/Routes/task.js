const express = require('express');
const router = express.Router();
const { registerUser, loginUser, setAvatar } = require('../Controller/task');
const fetchuser = require('../middleware/fetchuser');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/setAvatar/:id').post(setAvatar);

module.exports = router;

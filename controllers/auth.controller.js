const User = require('../models/User.model');
const bcrypt = require('bcryptjs');


exports.register = async (req, res) => {
  try {
    console.log(req.body);
    const { login, password } = req.body;

    const existingUser = await User.findOne({ login: login });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: 'User with this login already exists' });
    }
    if (
      !login ||
      !password ||
      typeof login !== 'string' ||
      typeof password !== 'string' ||
      login.length < 3 ||
      login.length > 20 ||
      password.length < 6 ||
      password.length > 25 
    ) {
      return res.status(400).json({ error: 'Incorrect registration data' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      login,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while registering' });
  }
};

exports.login = async (req, res) => {
  try {
    console.log(req.body);
    const { login, password } = req.body;

    if (
      login &&
      password &&
      typeof login === 'string' &&
      typeof password === 'string'
    ) {
      const user = await User.findOne({ login });
      if (!user) {
        return res.status(401).json({ error: 'Wrong login or password' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Wrong login or password' });
      } else {
        req.session.login = user.login;
        req.session.userId = user._id;
        res.status(200).json({ message: 'Logged in successfully' });
      }
    } else {
      return res.status(400).json({ error: 'Missing login or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while logging' });
  }
};

exports.getCurrentUser = async (req, res) => {
  
  res.send(req.session.login);
};

exports.logout = (req, res) => {
  console.log(req.session);
  req.session.destroy((err) => {
    if (err) {
      console.error('Error while logging out:', err);
      return res.status(500).json({ message: 'Error while logging out' });
    }

    return res.status(200).json({ message: `User LOGGED OUT` });
  });
};

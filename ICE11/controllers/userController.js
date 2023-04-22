const User = require('../models/user');
const passport = require('passport');

exports.getLogin = (req, res) => {
  res.render('login', { title: 'Login', user: req.user || null });
};

exports.getRegister = (req, res) => {
  res.render('register', { title: 'Register', user: req.user || null });
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render('update', { user, dataType: 'user', currentUser: req.user || null });
  } catch (error) {
    res.status(500).send('Error retrieving user: ' + error.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const user = await User.findById(req.params.id);

    if (password && confirmPassword && password === confirmPassword) {
      await user.setPassword(password);
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    await user.save();

    res.redirect('/'); // Redirect to an appropriate page after updating user
  } catch (error) {
    res.status(500).send('Error updating user: ' + error.message);
  }
};
exports.getUpdateUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    res.render('update', { user, dataType: 'user' });
  } catch (err) {
    console.log('Error finding user:', err);
    return res.redirect('/');
  }
};


exports.postRegister = (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  User.register(new User({ firstName, lastName, username, email }), password, (err, user) => {
    if (err) {
      console.log('Error registering user:', err);
      return res.render('register', { errorMessage: 'Registration failed' });
    }

    passport.authenticate('local')(req, res, () => {
      res.redirect('/');
    });
  });
};
exports.postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render('login', { errorMessage: 'Invalid username or password' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect('/login');
  });
};


const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');
const contactController = require('../controllers/contactController');
const { isAuthenticated } = require('../middlewares/auth'); // Update this line

// Login and Register routes
router.get('/login', userController.getLogin);
router.post('/login', passport.authenticate('local', {
  successRedirect: '/contact-list',
  failureRedirect: '/login',
  failureFlash: true
}));
router.get('/register', (req, res) => {
  res.render('register', { user: req.user });
});
router.post('/register', userController.postRegister);
router.get('/logout', userController.logout);

// Contact routes
router.get('/contact', isAuthenticated, contactController.getContacts);
router.get('/contact-list', isAuthenticated, contactController.getContactsList);
router.post('/contact', isAuthenticated, contactController.createContact);
router.get('/update/contact/:id', isAuthenticated, contactController.getUpdateContact); // Add this line
router.post('/update/contact/:id', isAuthenticated, contactController.updateContact);
router.delete('/contact/:id', isAuthenticated, contactController.deleteContact);

// User routes
router.get('/update/user/:id', isAuthenticated, userController.getUser);
router.post('/update/user/:id', isAuthenticated, userController.updateUser);

module.exports = router;

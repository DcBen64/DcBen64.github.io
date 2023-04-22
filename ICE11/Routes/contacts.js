const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/', contactController.getContacts);
router.get('/contact-list', contactController.getContactsList);
router.post('/create', contactController.createContact);
router.get('/:id', contactController.getContact);
router.put('/:id/update', contactController.updateContact);
router.get('/:id/edit', contactController.getUpdateContact);
router.delete('/:id/delete', contactController.deleteContact);

module.exports = router;

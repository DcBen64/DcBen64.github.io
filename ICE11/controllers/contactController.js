const Contact = require('../models/contact');

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.render('contacts', { title: 'Contacts - WEBD6201 Demo', user: req.user });
  } catch (error) {
    res.status(500).send('Error retrieving contacts: ' + error.message);
  }
};

exports.getContactsList = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.render('contact-list', { contacts: contacts, user: req.user || null });
  } catch (error) {
    res.status(500).send('Error retrieving contacts: ' + error.message);
  }
};

exports.createContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.redirect('/contact-list');
  } catch (error) {
    res.status(500).send('Error creating contact: ' + error.message);
  }
};

exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.render('update', { contact, dataType: 'contact', user: req.user || null });
  } catch (error) {
    res.status(500).send('Error retrieving contact: ' + error.message);
  }
};






exports.updateContact = async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/contact-list');
  } catch (error) {
    res.status(500).send('Error updating contact: ' + error.message);
  }
};

exports.getUpdateContact = async (req, res) => {
  const contactId = req.params.id;

  try {
    const contact = await Contact.findById(contactId);
    res.render('update', { user: req.user, contact, dataType: 'contact' });
  } catch (err) {
    console.log('Error finding contact:', err);
    return res.redirect('/contact-list');
  }
};

exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndRemove(req.params.id);
    res.redirect('/contact-list');
  } catch (error) {
    res.status(500).send('Error deleting contact: ' + error.message);
  }
};

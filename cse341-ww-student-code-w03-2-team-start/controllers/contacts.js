const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const database = require('../models/index');
const Contact = database.contacts;

const getAll = async (req, res) => {
  // const result = await mongodb.getDb().db().collection('contacts').find();
  // result.toArray().then((lists) => {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.status(200).json(lists);
  // });
  const allContacts = await Contact.find().catch((err) => {
    console.log('error with getAll function in the user controller', err);
  });
  res.status(200).json({ status: 'Success', numOfContacts: allContacts.length, data: allContacts });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await Contact.create(contact);
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('contacts').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};

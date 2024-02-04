// db.js
const ClassModel = require('../Models/ClassModel');

exports.read = async (req, res) => {
  try {
    const id = req.params.id;
    const table = await ClassModel.findById(id).exec();

    if (!table) {
      return res.status(404).send('Table not found');
    }

    res.send(table);
  } catch (err) {
    console.error('Error in read:', err);
    res.status(500).send('The read system encountered an error.');
  }
};

exports.list = async (req, res) => {
  try {
    const tables = await ClassModel.find({}).exec();
    res.send(tables);
  } catch (err) {
    console.error('Error in list:', err);
    res.status(500).send('The list system encountered an error.');
  }
};

exports.create = async (req, res) => {
  try {
    const table = new ClassModel(req.body);
    const savedTable = await table.save();
    res.send(savedTable);
  } catch (err) {
    console.error('Error in create:', err);
    res.status(500).send('The create system encountered an error.');
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await ClassModel.findByIdAndUpdate(id, req.body, { new: true }).exec();

    if (!updated) {
      return res.status(404).send('Table not found');
    }

    res.send(updated);
  } catch (err) {
    console.error('Error in update:', err);
    res.status(500).send('The update system encountered an error.');
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const removed = await ClassModel.findByIdAndDelete(id).exec();

    if (!removed) {
      return res.status(404).send('Table not found');
    }

    res.send(removed);
  } catch (err) {
    console.error('Error in remove:', err);
    res.status(500).send('The remove system encountered an error.');
  }
};

const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    res.status(404).json({
      message: "Not found",
    });
  }

  res.json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    res.status(404).json({
      message: "Not found",
    });
  }

  res.json({
    message: "contact deleted",
  });
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    res.status(404).json({
      message: "Not found",
    });
  }

  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );

  if (!result) {
    res.status(404).json({
      message: "Not found",
    });
  }

  res.json(result);
};

module.exports = {
  getAll,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};

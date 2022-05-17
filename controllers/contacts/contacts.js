const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email");
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: contactId, owner });
  if (!result) {
    res.status(404).json({
      message: "Not found",
    });
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndRemove({ _id: contactId, owner });

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
  const { _id } = req.user;
  const result = await Contact.create({
    ...req.body,
    owner: _id,
  });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
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

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { _id: owner } = req.user;

  console.log({ _id: contactId, owner });

  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
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

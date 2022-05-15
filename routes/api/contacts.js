const express = require("express");
const { ctrlWrapper, validation } = require("../../helpers");
const { joiContactSchema, favoriteJoiSchema } = require("../../models/contact");

const { contacts: ctrl } = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validation(joiContactSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validation(joiContactSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;

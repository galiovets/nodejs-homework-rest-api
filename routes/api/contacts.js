const express = require("express");
const { ctrlWrapper, validation } = require("../../helpers");
const { contacts: ctrl } = require("../../controllers/contacts");
const { auth } = require("../../middlewares/auth");
const { joiContactSchema, favoriteJoiSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", auth, ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  auth,
  validation(joiContactSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete("/:contactId", auth, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  auth,
  validation(joiContactSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  auth,
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;

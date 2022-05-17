const express = require("express");
const { ctrlWrapper, validation } = require("../../helpers");
const { auth: ctrl } = require("../../controllers/auth");
const {
  joiSignUpSchema,
  joiLoginSchema,
  updateSubscriptionJoiSchema,
} = require("../../models/user");
const { auth } = require("../../middlewares/auth");

const router = express.Router();

router.post("/signup", validation(joiSignUpSchema), ctrlWrapper(ctrl.signUp));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch(
  "/:userId/subscription",
  auth,
  validation(updateSubscriptionJoiSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;

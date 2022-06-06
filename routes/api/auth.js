const express = require("express");
const { ctrlWrapper, validation } = require("../../helpers");
const { auth: ctrl } = require("../../controllers/auth");
const {
  joiSignUpSchema,
  joiLoginSchema,
  updateSubscriptionJoiSchema,
  reverifyEmailJoiSchema,
} = require("../../models/user");
const { auth } = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

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

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/verify",
  validation(reverifyEmailJoiSchema),
  ctrlWrapper(ctrl.reverifyEmail)
);

module.exports = router;

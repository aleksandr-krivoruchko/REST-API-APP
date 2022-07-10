const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  logout,
  userCurrent,
  updateUserSubscription,
  updateUserAvatar,
  verifyEmail,
  resendingEmail,
} = require("../../controllers");

const { auth, upload } = require("../../middlewares");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", auth, logout);
router.get("/current", auth, userCurrent);
router.patch("/", auth, updateUserSubscription);
router.patch("/avatars", auth, upload.single("avatar"), updateUserAvatar);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", resendingEmail);

module.exports = router;

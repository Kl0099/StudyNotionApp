const express = require("express");
const { auth } = require("../middlewares/auth");
const fileUpload = require("express-fileupload");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  updateProfile,
  deleteAccount,
  getAllUserDetails,
  updateProfilePic,
} = require("../controllers/Profile");
const router = express.Router();

router.put("/updateprofile", auth, updateProfile);
router.post(
  "/updateprofilepic",
  auth,
  // upload.single("avatar"),
  updateProfilePic
);
router.delete("/deleteaccount", auth, deleteAccount);
router.get("/getallusersdetails", auth, getAllUserDetails);
module.exports = router;

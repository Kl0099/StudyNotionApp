const express = require("express");
const { auth } = require("../middlewares/auth");
const {
  updateProfile,
  deleteAccount,
  getAllUserDetails,
  updateProfilePic,
} = require("../controllers/Profile");
const router = express.Router();

router.put("/updateprofile", auth, updateProfile);
router.post("/updateprofilepic", auth, updateProfilePic);
router.delete("/deleteaccount", deleteAccount);
router.get("/getallusersdetails", auth, getAllUserDetails);
module.exports = router;

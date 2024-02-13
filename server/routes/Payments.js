const express = require("express");
const { capturePayment } = require("../controllers/Payments");
const router = express.Router();
const { auth, isStudent } = require("../middlewares/auth");

router.post("/capturepayment", auth, isStudent, capturePayment);

module.exports = router;

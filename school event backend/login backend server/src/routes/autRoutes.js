const express = require("express")
const {register, login} = require("../controller/authController");

const router = express.Router();

router.post("/register", register);
router.get("/register", register);
router.put("/register", register);
router.post("/login", login);


module.exports = router;
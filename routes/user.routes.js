const express = require("express");
const router = express.Router();

router.get("/register", (req, res) => {
	res.render("register");
});

router.post("/register", (req, res) => {});

router.get("/register", (req, res) => {});
module.exports = router;

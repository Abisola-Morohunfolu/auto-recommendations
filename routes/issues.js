const express = require("express");
const router = express.Router();

const { createIssues } = require("../controllers/issues");

router.route("/").post(createIssues);

module.exports = router;

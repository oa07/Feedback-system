const express = require("express");
const accountRoutes = require("./server/account/account.route");
const researcherRoutes = require("./server/researcher/researcher.route");
const router = express.Router();

router.use("/researcher", researcherRoutes);
router.use("/account", accountRoutes);

module.exports = router;

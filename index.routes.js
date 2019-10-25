const express = require("express");
const accountRoutes = require("./server/account/account.route");
const researcherRoutes = require("./server/researcher/researcher.route");
const audienceRoutes = require('./server/audience/audience.route');
const router = express.Router();

router.use("/researcher", researcherRoutes);
router.use('/audience', audienceRoutes);
router.use("/account", accountRoutes);

module.exports = router;

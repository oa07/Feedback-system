const express = require("express");
const accountRoutes = require("./server/account/account.route");
const adminRoutes = require("./server/admin/admin.route");
const researcherRoutes = require("./server/researcher/researcher.route");
const router = express.Router();
router.use("/researcher", researcherRoutes);
router.use("/account", accountRoutes);
router.use("/admin", adminRoutes);

module.exports = router;

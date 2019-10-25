const express = require("express");
const accountRoutes = require("./server/account/account.route");
const researcherRoutes = require("./server/researcher/researcher.route");
<<<<<<< HEAD
const audienceRoutes = require('./server/audience/audience.route');
const router = express.Router();
router.use("/researcher", researcherRoutes);
router.use('/audience', audienceRoutes);
=======
const router = express.Router();

router.use("/researcher", researcherRoutes);
>>>>>>> 601d1ad97d9ad3652e028373cf9888e0f444b5be
router.use("/account", accountRoutes);

module.exports = router;

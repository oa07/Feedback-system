const accountRoutes = require('./server/account/account.route');
const adminRoutes = require('./server/admin/admin.route');
const audienceRoutes = require('./server/audience/audience.route');
const express = require('express');
const researcherRoutes = require('./server/researcher/researcher.route');
const router = express.Router();

router.use('/account', accountRoutes);
router.use('/admin', adminRoutes);
router.use('/audience', audienceRoutes);
router.use('/researcher', researcherRoutes);

module.exports = router;

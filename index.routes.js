const express = require('express');
const researcherRoutes = require('./server/researcher/researcher.route');
const router = express.Router();

router.use('/researcher', researcherRoutes);

module.exports = router;
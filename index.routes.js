const express = require('express');
const researcherRoutes = require('./server/researcher/researcher.route');
const router = express.Router();

router.use('/researcher', researcherRoutes);
router.use('/api', (req, res) => {
  return res.json({
    success: 'ok'
  })
})

module.exports = router;
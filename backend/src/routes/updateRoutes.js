const express = require('express');

const router =
  express.Router();

const {

  createUpdate,

  getUpdates,

  getProjectUpdates,

  reviewUpdate

} = require(
  '../controllers/updatecontroller'
);


router.post(
  '/',
  createUpdate
);


router.get(
  '/',
  getUpdates
);


router.get(
  '/project/:projectId',
  getProjectUpdates
);


router.put(
  '/:id/review',
  reviewUpdate
);


module.exports = router;
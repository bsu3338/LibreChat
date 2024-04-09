const express = require('express');
const router = express.Router();
const { updatePreference, getPreference } = require('../services/UserService');
const { requireJwtAuth } = require('../middleware/');

router.put('/', requireJwtAuth, async (req, res) => {
  await updatePreference({ userId: req.user.id, ...req.body });
  res.status(201).send();
});

router.get('/', requireJwtAuth, async (req, res) => {
  const { name } = req.query;
  const response = await getPreference({ userId: req.user.id, name });
  res.status(200).send(response);
});

module.exports = router;

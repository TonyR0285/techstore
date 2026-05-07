const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/orderController');

router.post('/',                   ctrl.create);
router.get('/:userId',             ctrl.getByUser);
router.get('/admin/all',           ctrl.getAll);
router.put('/:id/status',          ctrl.updateStatus);

module.exports = router;

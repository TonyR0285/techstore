const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/cartController');

router.get('/:userId',     ctrl.getCart);
router.post('/add',        ctrl.addItem);
router.put('/update',      ctrl.updateItem);
router.delete('/remove/:id', ctrl.removeItem);

module.exports = router;

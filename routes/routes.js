const express = require('express');
const router = express.Router();

const Transaction = require('../controller/transaction');

router.post('/amount', Transaction.create);
router.get('/transaction/:id', Transaction.getOne);
router.get('/balance/:id', Transaction.getBalance);
router.get('/max_transaction_volume', Transaction.getMaxVolume);


module.exports = router;